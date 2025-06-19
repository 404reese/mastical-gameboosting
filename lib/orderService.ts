import { supabase } from '@/lib/supabase';
import { Order, OrderInsert, OrderUpdate, AdminOrderView } from '@/types/order';

/**
 * OrderService - Handles all order database operations
 * 
 * PAYMENT FLOW:
 * 1. Orders created with payment_status: 'Pending', order_status: 'Pending'
 * 2. PayPal payment completed → /api/paypal/verify automatically updates payment status
 * 3. Admin can manually update payment status if needed
 * 4. Admin manually marks order as delivered: order_status: 'Completed'
 */
export class OrderService {
  // Create a new order using API route for better server-side handling
  static async createOrder(orderData: OrderInsert): Promise<{ data: Order | null; error: any }> {
    try {
      // Ensure default statuses if not provided
      const orderWithDefaults = {
        ...orderData,
        payment_status: orderData.payment_status || 'Pending',
        order_status: orderData.order_status || 'Pending'
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderWithDefaults),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Error creating order via API:', result.error);
        return { data: null, error: result.error };
      }

      return { data: result.order, error: null };
    } catch (error) {
      console.error('Unexpected error creating order via API:', error);
      
      // Fallback to direct Supabase call
      try {
        const orderWithDefaults = {
          ...orderData,
          payment_status: orderData.payment_status || 'Pending',
          order_status: orderData.order_status || 'Pending'
        };

        const { data, error: supabaseError } = await supabase
          .from('orders')
          .insert([orderWithDefaults])
          .select()
          .single();

        if (supabaseError) {
          console.error('Error creating order via Supabase fallback:', supabaseError);
          return { data: null, error: supabaseError };
        }

        return { data, error: null };
      } catch (fallbackError) {
        console.error('Fallback error creating order:', fallbackError);
        return { data: null, error: fallbackError };
      }
    }
  }
  // Get all orders for admin panel
  static async getAllOrders(): Promise<{ data: AdminOrderView[] | null; error: any }> {
    try {
      // Use API route for better server-side handling with service key
      const response = await fetch('/api/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error fetching orders:', errorData);
        
        // Fallback to direct Supabase query
        try {
          const { data, error } = await supabase
            .from('admin_orders_view')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Fallback Supabase error:', error);
            return { data: null, error };
          }

          return { data, error: null };
        } catch (fallbackError) {
          console.error('Fallback error:', fallbackError);
          return { data: null, error: fallbackError };
        }
      }

      const result = await response.json();
      return { data: result.orders, error: null };

    } catch (error) {
      console.error('Unexpected error fetching orders:', error);
      
      // Fallback to direct Supabase query
      try {
        const { data, error: supabaseError } = await supabase
          .from('admin_orders_view')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) {
          console.error('Fallback Supabase error:', supabaseError);
          return { data: null, error: supabaseError };
        }

        return { data, error: null };
      } catch (fallbackError) {
        console.error('Final fallback error:', fallbackError);
        return { data: null, error: fallbackError };
      }
    }
  }
  // Get order by ID
  static async getOrderById(orderId: string): Promise<{ data: Order | null; error: any }> {
    try {
      // First try direct Supabase query
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (error) {
        console.error('Error fetching order:', error);
        
        // If direct query fails, try API route as fallback
        try {
          const response = await fetch(`/api/orders/${orderId}`);
          if (response.ok) {
            const apiData = await response.json();
            return { data: apiData, error: null };
          } else {
            console.error('API route also failed:', response.status);
            return { data: null, error: error };
          }
        } catch (apiError) {
          console.error('API route error:', apiError);
          return { data: null, error };
        }
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error fetching order:', error);
      return { data: null, error };
    }
  }
  // Update order status
  static async updateOrderStatus(
    orderId: string, 
    status: Order['order_status']
  ): Promise<{ data: Order | null; error: any }> {
    try {
      const updateData: OrderUpdate = { order_status: status };
      
      if (status === 'Completed') {
        updateData.completed_at = new Date().toISOString();
      }

      // Try API route first for better server-side handling
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });

        if (response.ok) {
          const data = await response.json();
          return { data, error: null };
        } else {
          console.error('API route failed, falling back to direct Supabase');
        }
      } catch (apiError) {
        console.error('API route error, falling back to direct Supabase:', apiError);
      }

      // Fallback to direct Supabase call
      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('order_id', orderId)
        .select()
        .single();

      if (error) {
        console.error('Error updating order status:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error updating order status:', error);
      return { data: null, error };
    }
  }  // Update payment status (Can be called by admins or automatically by payment verification)
  static async updatePaymentStatus(
    orderId: string, 
    status: Order['payment_status']
  ): Promise<{ data: Order | null; error: any }> {
    try {
      const updateData = { payment_status: status };

      // Try API route first for better server-side handling
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });

        if (response.ok) {
          const data = await response.json();
          return { data, error: null };
        } else {
          console.error('API route failed, falling back to direct Supabase');
        }
      } catch (apiError) {
        console.error('API route error, falling back to direct Supabase:', apiError);
      }

      // Fallback to direct Supabase call
      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('order_id', orderId)
        .select()
        .single();

      if (error) {
        console.error('Error updating payment status:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error updating payment status:', error);
      return { data: null, error };
    }
  }
  // Update order details
  static async updateOrder(
    orderId: string, 
    updateData: OrderUpdate
  ): Promise<{ data: Order | null; error: any }> {
    try {
      // Try API route first for better server-side handling
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });

        if (response.ok) {
          const data = await response.json();
          return { data, error: null };
        } else {
          console.error('API route failed, falling back to direct Supabase');
        }
      } catch (apiError) {
        console.error('API route error, falling back to direct Supabase:', apiError);
      }

      // Fallback to direct Supabase call
      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('order_id', orderId)
        .select()
        .single();

      if (error) {
        console.error('Error updating order:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error updating order:', error);
      return { data: null, error };
    }
  }

  // Get orders by customer email
  static async getOrdersByCustomer(email: string): Promise<{ data: Order[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', email)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching customer orders:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error fetching customer orders:', error);
      return { data: null, error };
    }
  }

  // Get orders by status
  static async getOrdersByStatus(status: Order['order_status']): Promise<{ data: AdminOrderView[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('admin_orders_view')
        .select('*')
        .eq('order_status', status)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders by status:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error fetching orders by status:', error);
      return { data: null, error };
    }
  }

  // Search orders
  static async searchOrders(query: string): Promise<{ data: AdminOrderView[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('admin_orders_view')
        .select('*')
        .or(`order_id.ilike.%${query}%,customer_name.ilike.%${query}%,customer_email.ilike.%${query}%,service.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching orders:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error searching orders:', error);
      return { data: null, error };
    }
  }

  // Get order statistics
  static async getOrderStats(): Promise<{ 
    data: {
      total: number;
      pending: number;
      processing: number;
      completed: number;
      cancelled: number;
      totalRevenue: number;
    } | null; 
    error: any 
  }> {
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('order_status, payment_status, amount');

      if (error) {
        console.error('Error fetching order stats:', error);
        return { data: null, error };
      }      const stats = {
        total: orders.length,
        pending: orders.filter((o: any) => o.order_status === 'Pending').length,
        processing: orders.filter((o: any) => o.order_status === 'Processing' || o.order_status === 'In Progress').length,
        completed: orders.filter((o: any) => o.order_status === 'Completed').length,
        cancelled: orders.filter((o: any) => o.order_status === 'Cancelled').length,
        totalRevenue: orders
          .filter((o: any) => o.payment_status === 'Completed')
          .reduce((sum: number, o: any) => sum + o.amount, 0)
      };

      return { data: stats, error: null };
    } catch (error) {
      console.error('Unexpected error fetching order stats:', error);
      return { data: null, error };
    }
  }

  // Update both payment and order status after successful payment
  static async completePayment(
    orderId: string, 
    paymentDetails?: {
      paypalOrderId?: string;
      paypalCaptureId?: string;
      paymentMethod?: string;
      transactionFee?: string;
      payerEmail?: string;
    }
  ): Promise<{ data: Order | null; error: any }> {
    try {
      const updateData: OrderUpdate = { 
        payment_status: 'Completed',
        order_status: 'Processing', // Payment confirmed, ready for fulfillment
      };

      // If payment details are provided, update service_details
      if (paymentDetails) {
        const currentOrder = await this.getOrderById(orderId);
        if (currentOrder.data) {
          const currentServiceDetails = currentOrder.data.service_details || {};
          updateData.service_details = {
            ...currentServiceDetails,
            ...paymentDetails,
            payment_completed_at: new Date().toISOString(),
          };
        }
      }

      // Try API route first for better server-side handling
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });

        if (response.ok) {
          const data = await response.json();
          return { data, error: null };
        } else {
          console.error('API route failed, falling back to direct Supabase');
        }
      } catch (apiError) {
        console.error('API route error, falling back to direct Supabase:', apiError);
      }

      // Fallback to direct Supabase call
      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('order_id', orderId)
        .select()
        .single();

      if (error) {
        console.error('Error completing payment:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error completing payment:', error);
      return { data: null, error };
    }
  }

  // Mark order as fully completed (service delivered)
  static async markOrderCompleted(
    orderId: string
  ): Promise<{ data: Order | null; error: any }> {
    try {
      const updateData: OrderUpdate = { 
        order_status: 'Completed',
        completed_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('order_id', orderId)
        .select()
        .single();

      if (error) {
        console.error('Error marking order completed:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error marking order completed:', error);
      return { data: null, error };
    }
  }
}
