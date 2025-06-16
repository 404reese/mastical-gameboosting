// Types for Supabase orders table
export interface Order {
  id: number;
  order_id: string;
  customer_name: string;
  customer_email?: string;
  delivery_speed: 'Standard' | 'Express' | 'Ultra Express' | '24h' | '6h' | '1h';
  service: string;
  amount: number;
  payment_status: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
  order_status: 'Pending' | 'Processing' | 'In Progress' | 'Completed' | 'Cancelled';
  created_at: string;
  updated_at: string;
  platform?: 'PC' | 'Xbox' | 'PlayStation';
  service_type?: string;
  service_details?: any; // JSONB field
  customer_notes?: string;
  admin_notes?: string;
  estimated_completion?: string;
  completed_at?: string;
}

// Type for inserting new orders (without auto-generated fields)
export interface OrderInsert {
  customer_name: string;
  customer_email?: string;
  delivery_speed: Order['delivery_speed'];
  service: string;
  amount: number;
  platform?: Order['platform'];
  service_type?: string;
  service_details?: any;
  customer_notes?: string;
  estimated_completion?: string;
}

// Type for updating orders
export interface OrderUpdate {
  customer_name?: string;
  customer_email?: string;
  delivery_speed?: Order['delivery_speed'];
  service?: string;
  amount?: number;
  payment_status?: Order['payment_status'];
  order_status?: Order['order_status'];
  platform?: Order['platform'];
  service_type?: string;
  service_details?: any;
  customer_notes?: string;
  admin_notes?: string;
  estimated_completion?: string;
  completed_at?: string;
}

// Admin view type (matches the admin_orders_view)
export interface AdminOrderView {
  order_id: string;
  customer_name: string;
  customer_email?: string;
  delivery_speed: string;
  service: string;
  amount: number;
  payment_status: string;
  order_status: string;
  platform?: string;
  order_date: string;
  created_at: string;
  updated_at: string;
  expected_completion: string;
}

// Helper type for creating orders from form data
export interface OrderFormData {
  customerName: string;
  customerEmail?: string;
  deliverySpeed: string;
  service: string;
  amount: number;
  platform: string;
  serviceType: string;
  serviceDetails?: {
    [key: string]: any;
  };
  customerNotes?: string;
}
