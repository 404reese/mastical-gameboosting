import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { OrderInsert } from '@/types/order';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create admin client - use service role if available, otherwise anon key
const supabaseClient = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey || supabaseAnonKey,
  supabaseServiceKey ? {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  } : undefined
);

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderInsert = await request.json();

    console.log('API: Creating order with service key available:', !!supabaseServiceKey);

    // Validate required fields
    if (!orderData.customer_name || !orderData.service || !orderData.amount) {
      return NextResponse.json(
        { error: 'Missing required fields: customer_name, service, amount' },
        { status: 400 }
      );
    }

    // Create order
    const { data, error } = await supabaseClient
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      return NextResponse.json(
        { error: 'Failed to create order', details: error.message },
        { status: 500 }
      );
    }

    console.log('Order created successfully:', data.order_id);
    return NextResponse.json({ 
      success: true, 
      order: data,
      orderId: data.order_id 
    });

  } catch (error) {
    console.error('Unexpected error creating order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('API: Fetching all orders');
    console.log('Service key available:', !!supabaseServiceKey);
    console.log('Using client with service role:', !!supabaseServiceKey);

    // Get all orders using admin client
    const { data, error } = await supabaseClient
      .from('admin_orders_view')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      return NextResponse.json(
        { error: 'Failed to fetch orders', details: error.message, code: error.code },
        { status: 500 }
      );
    }

    console.log('Successfully fetched orders:', data?.length || 0);
    return NextResponse.json({ 
      success: true, 
      orders: data || [] 
    });

  } catch (error) {
    console.error('Unexpected error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
