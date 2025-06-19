'use client';

import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import { validateEnv } from "@/lib/env";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createPayPalOrderData, validatePayPalOrderData } from "@/lib/paypalUtils";

interface PayPalCheckoutNewProps {
  onSuccess?: (orderId: string) => void;
  onError?: (error: any) => void;
  disabled?: boolean;
  checkoutData?: {
    customerName: string;
    customerEmail: string;
    customerNotes?: string;
    gtaAccountEmail: string;
    gtaAccountPassword: string;
  };
  createdOrderIds?: string[];
}

// PayPal Buttons wrapper component
function PayPalButtonsWrapper({ onSuccess, onError, disabled, checkoutData, createdOrderIds }: PayPalCheckoutNewProps) {
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();
  const { cart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderCreationError, setOrderCreationError] = useState<string | null>(null);

  const createOrder = async (data: any, actions: any) => {
    try {
      setOrderCreationError(null);
      
      if (cart.totalPrice <= 0) {
        throw new Error("Cart is empty or invalid total amount");
      }

      console.log("Creating PayPal order with total:", cart.totalPrice);
      
      // Use utility function to create properly formatted PayPal order data
      const orderData = createPayPalOrderData(cart);
      
      // Validate the order data before sending to PayPal
      const validation = validatePayPalOrderData(orderData);
      if (!validation.isValid) {
        console.error("PayPal order validation failed:", validation.errors);
        throw new Error(`Order validation failed: ${validation.errors.join(', ')}`);
      }

      console.log("Creating PayPal order with validated data:", {
        total: orderData.total,
        itemTotal: orderData.itemTotal,
        itemCount: orderData.items.length
      });

      const orderRequest = {
        intent: 'CAPTURE' as const,
        purchase_units: [
          {
            reference_id: `order_${Date.now()}`,
            amount: {
              currency_code: "USD",
              value: orderData.total.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: orderData.itemTotal.toFixed(2),
                },
                ...(orderData.taxTotal > 0 && {
                  tax_total: {
                    currency_code: "USD",
                    value: orderData.taxTotal.toFixed(2),
                  }
                }),
                ...(orderData.shippingTotal > 0 && {
                  shipping: {
                    currency_code: "USD",
                    value: orderData.shippingTotal.toFixed(2),
                  }
                }),
                ...(orderData.handlingTotal > 0 && {
                  handling: {
                    currency_code: "USD",
                    value: orderData.handlingTotal.toFixed(2),
                  }
                }),
                ...(orderData.discountTotal > 0 && {
                  discount: {
                    currency_code: "USD",
                    value: orderData.discountTotal.toFixed(2),
                  }
                }),
              },
            },
            description: `Gaming Boost Services - ${cart.totalItems} item(s)`,
            custom_id: `custom_${Date.now()}`,
            invoice_id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            items: orderData.items,
          },
        ],
        application_context: {
          brand_name: "Mastical Game Boosting",
          landing_page: "NO_PREFERENCE" as const,
          shipping_preference: "NO_SHIPPING" as const,
          user_action: "PAY_NOW" as const,
          return_url: `${window.location.origin}/checkout/success`,
          cancel_url: `${window.location.origin}/checkout/cancel`,
          payment_method: {
            payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED" as const,
          },
        },
      };

      console.log("PayPal order request:", JSON.stringify(orderRequest, null, 2));
      
      return await actions.order.create(orderRequest);
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      setOrderCreationError(error instanceof Error ? error.message : 'Failed to create order');
      toast.error("Failed to create order. Please try again.");
      throw error;
    }
  };

  const onApprove = async (data: any, actions: any) => {
    setIsLoading(true);
    
    try {
      console.log("PayPal onApprove data:", data);
      
      // Capture the payment
      const captureResult = await actions.order.capture();
      console.log("PayPal capture result:", captureResult);
      
      // Check if capture was successful
      if (!captureResult || captureResult.status !== 'COMPLETED') {
        throw new Error(`Payment capture failed. Status: ${captureResult?.status || 'unknown'}`);
      }

      // Verify captures exist and are completed
      const captures = captureResult.purchase_units?.[0]?.payments?.captures;
      if (!captures || captures.length === 0) {
        throw new Error('No payment captures found');
      }

      interface PayPalCapture {
        id: string;
        status: string;
        [key: string]: any;
      }

      const completedCaptures: PayPalCapture[] = captures.filter((capture: PayPalCapture) => capture.status === 'COMPLETED');
      if (completedCaptures.length === 0) {
        throw new Error('No completed payment captures found');
      }

      console.log("Payment successfully captured:", completedCaptures);

      // Verify the order with our backend and update database
      const verificationResponse = await fetch('/api/paypal/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          orderId: captureResult.id,
          checkoutData: checkoutData,
          cartItems: cart.items,
          createdOrderIds: createdOrderIds,
          captureDetails: captureResult
        }),
      });

      if (!verificationResponse.ok) {
        const errorData = await verificationResponse.json().catch(() => ({}));
        throw new Error(`Order verification failed: ${errorData.error || 'Unknown error'}`);
      }

      const verificationData = await verificationResponse.json();
      console.log("PayPal payment verified and database updated:", verificationData);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(captureResult.id);
      }
      
      // Clear the cart after successful payment
      clearCart();
      
      toast.success("Payment successful! Your order has been placed and is being processed.");
      
      // Redirect to success page with order details
      const successUrl = `/checkout/success?order_id=${captureResult.id}${createdOrderIds?.length ? `&db_orders=${createdOrderIds.join(',')}` : ''}`;
      window.location.href = successUrl;
      
    } catch (error) {
      console.error("PayPal payment error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
      toast.error(`Payment failed: ${errorMessage}`);
      
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onErrorHandler = (error: any) => {
    console.error("PayPal error:", error);
    toast.error("PayPal checkout error. Please try again.");
    
    if (onError) {
      onError(error);
    }
  };

  const onCancel = (data: any) => {
    console.log("PayPal payment cancelled:", data);
    toast.info("Payment cancelled");
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        <span className="text-sm">Loading PayPal...</span>
      </div>
    );
  }

  if (isRejected) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500 text-sm mb-2">Failed to load PayPal</p>
        <p className="text-xs text-muted-foreground">Please refresh the page and try again</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing payment...</span>
          </div>
        </div>
      )}
      
      {orderCreationError && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{orderCreationError}</p>
        </div>
      )}
      
      <PayPalButtons
        disabled={disabled || isLoading || cart.totalPrice <= 0}
        forceReRender={[cart.totalPrice, cart.totalItems]}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onErrorHandler}
        onCancel={onCancel}
        style={{
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "pay",
          height: 48,
          tagline: false,
        }}
      />
    </div>
  );
}

export default function PayPalCheckoutNew({ onSuccess, onError, disabled, checkoutData, createdOrderIds }: PayPalCheckoutNewProps) {
  const { cart } = useCart();

  // Get PayPal client ID from environment
  let paypalClientId: string | undefined;
  
  try {
    const env = validateEnv();
    paypalClientId = env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  } catch (error) {
    console.warn("Environment validation failed:", error);
  }

  // Additional validation for PayPal Client ID format
  if (!paypalClientId || paypalClientId.trim() === '' || paypalClientId === 'your_paypal_client_id_here') {
    console.warn("PayPal Client ID not found or invalid in environment variables");
    return (
      <div className="text-center py-4">
        <p className="text-red-500 text-sm mb-2">PayPal configuration missing.</p>
        <p className="text-xs text-muted-foreground">Please configure NEXT_PUBLIC_PAYPAL_CLIENT_ID in your .env.local file.</p>
        <details className="mt-2 text-xs">
          <summary className="cursor-pointer text-muted-foreground">Debug Info</summary>
          <div className="mt-1 p-2 bg-muted rounded text-left">
            Client ID: {paypalClientId || 'undefined'}<br/>
            Length: {paypalClientId?.length || 0}
          </div>
        </details>
      </div>
    );
  }

  // Validate Client ID format
  if (!/^[A-Za-z0-9_-]+$/.test(paypalClientId) || paypalClientId.length < 10) {
    console.error("Invalid PayPal Client ID format:", paypalClientId.substring(0, 10) + "...");
    return (
      <div className="text-center py-4">
        <p className="text-red-500 text-sm mb-2">Invalid PayPal Client ID format.</p>
        <p className="text-xs text-muted-foreground">Please check your PayPal Client ID in .env.local</p>
      </div>
    );
  }

  if (cart.totalPrice <= 0) {
    return (
      <Button disabled className="w-full">
        Cart is empty
      </Button>
    );
  }

  const initialOptions = {
    clientId: paypalClientId,
    currency: "USD",
    intent: "capture",
    components: "buttons",
    "enable-funding": "venmo,paylater",
    "disable-funding": "",
  };

  return (
    <div className="w-full">      <PayPalScriptProvider options={initialOptions}>        <PayPalButtonsWrapper 
          onSuccess={onSuccess}
          onError={onError}
          disabled={disabled}
          checkoutData={checkoutData}
          createdOrderIds={createdOrderIds}
        />
      </PayPalScriptProvider>
    </div>
  );
}
