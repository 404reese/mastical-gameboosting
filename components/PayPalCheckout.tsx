'use client';

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";
import { validateEnv } from "@/lib/env";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PayPalCheckoutProps {
  onSuccess?: (orderId: string) => void;
  onError?: (error: any) => void;
  disabled?: boolean;
}

export default function PayPalCheckout({ onSuccess, onError, disabled }: PayPalCheckoutProps) {
  const { cart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);  // Get PayPal client ID from environment
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
      </div>
    );
  }

  // Validate Client ID format (should start with A and be around 80 characters for sandbox, or be shorter for live)
  if (!/^[A-Za-z0-9_-]+$/.test(paypalClientId) || paypalClientId.length < 10) {
    console.error("Invalid PayPal Client ID format:", paypalClientId.substring(0, 10) + "...");
    return (
      <div className="text-center py-4">
        <p className="text-red-500 text-sm mb-2">Invalid PayPal Client ID format.</p>
        <p className="text-xs text-muted-foreground">Please check your PayPal Client ID in .env.local</p>
      </div>
    );
  }  const initialOptions = {
    clientId: paypalClientId,
    currency: "USD",
    intent: "capture",
    "enable-funding": "venmo,paylater",
    "disable-funding": "",
    "data-sdk-integration-source": "button-factory",
  };  const createOrder = async (data: any, actions: any) => {
    if (cart.totalPrice <= 0) {
      toast.error("Cart is empty or invalid total amount");
      return;
    }

    console.log("Creating PayPal order with total:", cart.totalPrice);

    try {
      // Calculate accurate totals for PayPal breakdown
      const cartItems = cart.items.map((item, index) => {
        const unitPrice = parseFloat((item.price + item.deliveryCost).toFixed(2));
        
        return {
          name: item.service.substring(0, 127),
          unit_amount: {
            currency_code: "USD",
            value: unitPrice.toFixed(2),
          },
          quantity: item.quantity.toString(),
          description: `${item.platform} - ${item.deliverySpeed}${item.amount ? ` - ${item.amount}M` : ''}`.substring(0, 127),
          category: "DIGITAL_GOODS",
          sku: `item_${index}_${Date.now()}`,
        };
      });

      // Calculate exact item total from individual items
      const itemTotal = cart.items.reduce((total, item) => {
        const unitPrice = parseFloat((item.price + item.deliveryCost).toFixed(2));
        return total + (unitPrice * item.quantity);
      }, 0);

      const taxTotal = 0; // No tax for digital goods
      const shippingTotal = 0; // No shipping for digital services
      const handlingTotal = 0; // No handling for digital services
      const discountTotal = 0; // No discount applied

      // Ensure the total matches the breakdown
      const calculatedTotal = itemTotal + taxTotal + shippingTotal + handlingTotal - discountTotal;

      return await actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: calculatedTotal.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: itemTotal.toFixed(2),
                },
                tax_total: {
                  currency_code: "USD",
                  value: taxTotal.toFixed(2),
                },
                shipping: {
                  currency_code: "USD",
                  value: shippingTotal.toFixed(2),
                },
                handling: {
                  currency_code: "USD",
                  value: handlingTotal.toFixed(2),
                },
                discount: {
                  currency_code: "USD",
                  value: discountTotal.toFixed(2),
                },
              },
            },
            description: `Gaming Boost Services - ${cart.totalItems} item(s)`,
            custom_id: `order_${Date.now()}`,
            invoice_id: `inv_${Date.now()}`,
            items: cartItems,
          },
        ],
        application_context: {
          brand_name: "Mastical Game Boosting",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${window.location.origin}/checkout/success`,
          cancel_url: `${window.location.origin}/checkout/cancel`,
        },
      });
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      toast.error("Failed to create order. Please try again.");
      throw error;
    }
  };
  const onApprove = async (data: any, actions: any) => {
    setIsLoading(true);
    
    try {
      const details = await actions.order.capture();
      
      // Verify the order with our backend
      const verificationResponse = await fetch('/api/paypal/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId: details.id }),
      });

      if (!verificationResponse.ok) {
        throw new Error('Order verification failed');
      }

      const verificationData = await verificationResponse.json();
      console.log("PayPal payment verified:", verificationData);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(details.id);
      }
      
      // Clear the cart after successful payment
      clearCart();
      
      toast.success("Payment successful! Your order has been placed.");
      
      // Redirect to success page
      window.location.href = `/checkout/success?order_id=${details.id}`;
      
    } catch (error) {
      console.error("PayPal payment error:", error);
      toast.error("Payment failed. Please try again.");
      
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

  if (cart.totalPrice <= 0) {
    return (
      <Button disabled className="w-full">
        Cart is empty
      </Button>
    );
  }

  return (
    <div className="w-full">
      <PayPalScriptProvider 
        options={initialOptions}
        deferLoading={false}
      >        <div className="paypal-container relative">
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing payment...</span>
              </div>
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
            fundingSource={undefined}
          />
        </div>
      </PayPalScriptProvider>
    </div>
  );
}
