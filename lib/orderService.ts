import { supabase } from '@/lib/supabase';
import { Order, OrderInsert, OrderUpdate, AdminOrderView } from '@/types/order';

export class OrderService {
  // Create a new order
  static async createOrder(orderData: OrderInsert): Promise<{ data: Order | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) {
        console.error('Error creating order:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error creating order:', error);
      return { data: null, error };
    }
  }

  // Get all orders for admin panel
  static async getAllOrders(): Promise<{ data: AdminOrderView[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('admin_orders_view')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Unexpected error fetching orders:', error);
      return { data: null, error };
    }
  }

  // Get order by ID
  static async getOrderById(orderId: string): Promise<{ data: Order | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (error) {
        console.error('Error fetching order:', error);
        return { data: null, error };
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
  }

  // Update payment status
  static async updatePaymentStatus(
    orderId: string, 
    status: Order['payment_status']
  ): Promise<{ data: Order | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ payment_status: status })
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
}
