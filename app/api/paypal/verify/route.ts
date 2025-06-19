import { NextRequest, NextResponse } from 'next/server';
import { validateServerEnv } from '@/lib/env';
import { OrderService } from '@/lib/orderService';

const PAYPAL_API_BASE = process.env.PAYPAL_ENVIRONMENT === 'live' 
  ? 'https://api.paypal.com' 
  : 'https://api.sandbox.paypal.com';

async function getPayPalAccessToken() {
  try {
    const env = validateServerEnv();
    const clientId = env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = env.PAYPAL_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
      throw new Error('PayPal credentials not configured');
    }

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PayPal token response:', response.status, errorText);
      throw new Error(`Failed to get PayPal access token: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, checkoutData, cartItems, createdOrderIds, captureDetails } = body;

    console.log('PayPal verification request:', { 
      orderId, 
      hasCheckoutData: !!checkoutData, 
      cartItemsCount: cartItems?.length || 0,
      createdOrdersCount: createdOrderIds?.length || 0 
    });

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Verify the order with PayPal
    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PayPal order verification failed:', response.status, errorText);
      throw new Error(`Failed to verify PayPal order: ${response.status}`);
    }

    const orderDetails = await response.json();
    console.log('PayPal order details:', orderDetails);

    // Verify payment was completed
    if (orderDetails.status !== 'COMPLETED') {
      console.error('PayPal order not completed:', orderDetails.status);
      return NextResponse.json(
        { error: `Payment not completed. Status: ${orderDetails.status}` },
        { status: 400 }
      );
    }

    // Verify captures exist and are completed
    const captures = orderDetails.purchase_units?.[0]?.payments?.captures;
    if (!captures || captures.length === 0) {
      console.error('No payment captures found in PayPal order');
      return NextResponse.json(
        { error: 'No payment captures found' },
        { status: 400 }
      );
    }

    interface PayPalCapture {
      id: string;
      status: string;
      amount: {
      currency_code: string;
      value: string;
      };
      seller_receivable_breakdown?: {
      paypal_fee?: {
        currency_code: string;
        value: string;
      };
      };
      [key: string]: any;
    }

    const completedCaptures: PayPalCapture[] = (captures as PayPalCapture[]).filter((capture: PayPalCapture) => capture.status === 'COMPLETED');
    if (completedCaptures.length === 0) {
      console.error('No completed captures found:', captures);
      return NextResponse.json(
        { error: 'No completed payment captures found' },
        { status: 400 }
      );
    }

    console.log('Payment verification successful:', completedCaptures);

    // Update existing orders if we have them
    if (createdOrderIds && Array.isArray(createdOrderIds) && createdOrderIds.length > 0) {
      console.log('Updating existing orders with payment status:', createdOrderIds);
      
      const updatePromises = createdOrderIds.map(async (dbOrderId: string) => {
        try {
          // Update payment status to completed first
          await OrderService.updatePaymentStatus(dbOrderId, 'Completed');
          
          // Update order status to processing (payment confirmed, ready for fulfillment)
          await OrderService.updateOrderStatus(dbOrderId, 'Processing');
          
          // Update service details to include PayPal information and payment completion
          const orderResult = await OrderService.getOrderById(dbOrderId);
          if (orderResult.data) {
            const currentServiceDetails = orderResult.data.service_details || {};
            await OrderService.updateOrder(dbOrderId, {
              service_details: {
                ...currentServiceDetails,
                paypal_order_id: orderId,
                paypal_capture_id: completedCaptures[0].id,
                payment_method: 'PayPal',
                payment_completed_at: new Date().toISOString(),
                paypal_amount: completedCaptures[0].amount,
                paypal_payer_email: orderDetails.payer?.email_address,
                paypal_transaction_fee: completedCaptures[0].seller_receivable_breakdown?.paypal_fee?.value,
              }
            });
          }
          
          return { success: true, orderId: dbOrderId };
        } catch (error) {
          console.error(`Failed to update order ${dbOrderId}:`, error);
          return { success: false, orderId: dbOrderId, error };
        }
      });

      const updateResults = await Promise.all(updatePromises);
      const successfulUpdates = updateResults.filter(result => result.success);
      
      console.log(`Updated ${successfulUpdates.length}/${updateResults.length} orders for PayPal order ${orderId}`);
      
      if (successfulUpdates.length === 0) {
        throw new Error('Failed to update any orders in database');
      }
    }
    // Create orders as fallback if none exist
    else if (checkoutData && cartItems && Array.isArray(cartItems)) {
      console.log('Creating new orders as fallback for PayPal order:', orderId);
      
      const orderCreationPromises = cartItems.map(async (item: any) => {
        try {
          const gtaAccountCredits = item.serviceDetails?.moneyAmount || 
                                    item.serviceDetails?.cashAmount || 
                                    item.serviceDetails?.creditAmount || 
                                    item.amount || 0;

          const orderData = {
            customer_name: checkoutData.customerName,
            customer_email: checkoutData.customerEmail,
            delivery_speed: item.deliverySpeed,
            service: item.service,
            amount: item.price + item.deliveryCost,
            platform: item.platform,
            service_type: item.serviceType,
            service_details: {
              ...item.serviceDetails,
              quantity: item.quantity,
              paypal_order_id: orderId,
              paypal_capture_id: completedCaptures[0].id,
              payment_method: 'PayPal',
              payment_completed_at: new Date().toISOString(),
              paypal_amount: completedCaptures[0].amount,
              paypal_payer_email: orderDetails.payer?.email_address,
              paypal_transaction_fee: completedCaptures[0].seller_receivable_breakdown?.paypal_fee?.value,
            },
            customer_notes: checkoutData.customerNotes,
            gta_account_email: checkoutData.gtaAccountEmail,
            gta_account_password: checkoutData.gtaAccountPassword,
            gta_account_credits: gtaAccountCredits,
            payment_status: 'Completed' as 'Completed',
            order_status: 'Processing' as 'Processing',
          };

          const createResult = await OrderService.createOrder(orderData);
          return { success: !createResult.error, data: createResult.data, error: createResult.error };
        } catch (error) {
          console.error('Error creating order:', error);
          return { success: false, error };
        }
      });

      const orderResults = await Promise.all(orderCreationPromises);
      const successfulOrders = orderResults.filter(result => result.success);
      
      console.log(`Created ${successfulOrders.length}/${orderResults.length} new orders for PayPal order ${orderId}`);
      
      if (successfulOrders.length === 0) {
        throw new Error('Failed to create any orders in database');
      }
    }

    return NextResponse.json({
      success: true,
      order: orderDetails,
      captures: completedCaptures,
      updated_orders: createdOrderIds?.length || 0,
      message: 'Payment verified and orders updated successfully',
    });

  } catch (error) {
    console.error('PayPal verification error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to verify PayPal order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('order_id');

  if (!orderId) {
    return NextResponse.json(
      { error: 'Order ID is required' },
      { status: 400 }
    );
  }

  try {
    // Here you would fetch order details from your database
    // For now, we'll return a placeholder response
    
    return NextResponse.json({
      orderId,
      status: 'completed',
      message: 'Order details retrieved successfully',
    });

  } catch (error) {
    console.error('Error fetching order details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order details' },
      { status: 500 }
    );
  }
}
