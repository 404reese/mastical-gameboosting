-- Create orders table for storing user orders
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) UNIQUE NOT NULL DEFAULT 'ORD-' || EXTRACT(EPOCH FROM NOW())::TEXT || '-' || FLOOR(RANDOM() * 1000)::TEXT,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  delivery_speed VARCHAR(50) NOT NULL CHECK (delivery_speed IN ('Standard', 'Express', 'Ultra Express', '24h', '6h', '1h')),
  service TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Completed', 'Failed', 'Refunded')),
  order_status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (order_status IN ('Pending', 'Processing', 'In Progress', 'Completed', 'Cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- Additional fields for better order management
  platform VARCHAR(20) CHECK (platform IN ('PC', 'Xbox', 'PlayStation')),
  service_type VARCHAR(50), -- e.g., 'Money Boost', 'Rank Boost', 'Credits', etc.
  service_details JSONB, -- Store additional service-specific details
  customer_notes TEXT,
  admin_notes TEXT,
  estimated_completion TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
    -- GTA Account credentials for service delivery
  gta_account_email VARCHAR(255),
  gta_account_password TEXT, -- Encrypted password for account access
  gta_account_credits DECIMAL(15, 2), -- GTA account credit amount in millions
);

-- Create indexes for better performance
CREATE INDEX idx_orders_order_id ON orders(order_id);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_platform ON orders(platform);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_orders_updated_at 
BEFORE UPDATE ON orders 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO orders (
  customer_name, 
  customer_email, 
  delivery_speed, 
  service, 
  amount, 
  platform, 
  service_type,
  service_details
) VALUES 
(
  'John Smith', 
  'john.smith@email.com', 
  'Express', 
  'PC Money Boost - $10M', 
  15.99, 
  'PC', 
  'Money Boost',
  '{"amount": "10M", "delivery_time": "Express"}'
),
(
  'Sarah Johnson', 
  'sarah.j@email.com', 
  'Standard', 
  'Xbox Rank Boost - Level 100', 
  25.99, 
  'Xbox', 
  'Rank Boost',
  '{"target_rank": "100", "current_rank": "45"}'
),
(
  'Mike Davis', 
  'mike.davis@email.com', 
  'Ultra Express', 
  'PC Credits - Megalodon Shark Card', 
  12.99, 
  'PC', 
  'Credits',
  '{"credit_type": "Megalodon Shark Card", "amount": "$8,000,000"}'
);

-- Create a view for admin panel display
CREATE VIEW admin_orders_view AS
SELECT 
  order_id,
  customer_name,
  customer_email,
  delivery_speed,
  service,
  amount,
  payment_status,
  order_status,
  platform,
  service_type,
  service_details,
  customer_notes,
  admin_notes,
  gta_account_email,
  gta_account_password,
  created_at::DATE as order_date,
  created_at,
  updated_at,
  estimated_completion,
  completed_at,
  CASE 
    WHEN order_status = 'Completed' THEN completed_at
    WHEN estimated_completion IS NOT NULL THEN estimated_completion
    ELSE created_at + INTERVAL '72 hours' -- Default 72 hours if no estimate
  END as expected_completion
FROM orders
ORDER BY created_at DESC;

-- Enable Row Level Security (RLS) for security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to insert orders (customers)
CREATE POLICY "Allow anonymous order creation" ON orders
  FOR INSERT WITH CHECK (true);

-- Create policy for authenticated users to insert orders (customers)
CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy for anonymous users to view orders (for admin access)
CREATE POLICY "Allow public order access" ON orders
  FOR SELECT USING (true);

-- Create policy for admin users to view all orders
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    (current_setting('request.jwt.claims', true)::json->>'role' = 'admin') OR
    (auth.role() = 'service_role') OR
    (auth.role() = 'anon')
  );

-- Create policy for admin users to update orders
CREATE POLICY "Admins can update orders" ON orders
  FOR UPDATE USING (
    (current_setting('request.jwt.claims', true)::json->>'role' = 'admin') OR
    (auth.role() = 'service_role')
  );

-- Grant permissions to anonymous users for order creation
GRANT INSERT ON orders TO anon;
GRANT SELECT ON orders TO anon;

-- Grant permissions to authenticated users
GRANT SELECT, INSERT ON orders TO authenticated;
GRANT SELECT ON admin_orders_view TO authenticated;

-- Grant all permissions to service_role (for admin operations)
GRANT ALL ON orders TO service_role;
GRANT ALL ON admin_orders_view TO service_role;
