// Supabase database type definitions
export interface Database {
  public: {
    Tables: {
      orders: {        Row: {
          id: number;
          order_id: string;
          customer_name: string;
          customer_email: string | null;
          delivery_speed: string;
          service: string;
          amount: number;
          payment_status: string;
          order_status: string;
          created_at: string;
          updated_at: string;
          platform: string | null;
          service_type: string | null;
          service_details: any | null;
          customer_notes: string | null;
          admin_notes: string | null;
          estimated_completion: string | null;
          completed_at: string | null;
          gta_account_email: string | null;
          gta_account_password: string | null;
        };        Insert: {
          id?: number;
          order_id?: string;
          customer_name: string;
          customer_email?: string | null;
          delivery_speed: string;
          service: string;
          amount: number;
          payment_status?: string;
          order_status?: string;
          created_at?: string;
          updated_at?: string;
          platform?: string | null;
          service_type?: string | null;
          service_details?: any | null;
          customer_notes?: string | null;
          admin_notes?: string | null;
          estimated_completion?: string | null;
          completed_at?: string | null;
          gta_account_email?: string | null;
          gta_account_password?: string | null;
        };        Update: {
          id?: number;
          order_id?: string;
          customer_name?: string;
          customer_email?: string | null;
          delivery_speed?: string;
          service?: string;
          amount?: number;
          payment_status?: string;
          order_status?: string;
          created_at?: string;
          updated_at?: string;
          platform?: string | null;
          service_type?: string | null;
          service_details?: any | null;
          customer_notes?: string | null;
          admin_notes?: string | null;
          estimated_completion?: string | null;
          completed_at?: string | null;
          gta_account_email?: string | null;
          gta_account_password?: string | null;
        };
      };
    };
    Views: {      admin_orders_view: {
        Row: {
          order_id: string;
          customer_name: string;
          customer_email: string | null;
          delivery_speed: string;
          service: string;
          amount: number;
          payment_status: string;
          order_status: string;
          platform: string | null;
          gta_account_email: string | null;
          order_date: string;
          created_at: string;
          updated_at: string;
          expected_completion: string;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
