# Supabase Integration for GTA5 Game Boosting Site

This project integrates Supabase for order management and admin panel functionality.

## Setup Instructions

### 1. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 2. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be set up
3. Go to Project Settings > API to get your keys

### 3. Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Create Database Schema

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/create-orders-table.sql`
4. Run the SQL script

### 5. Configure Row Level Security (Optional)

The SQL script already includes RLS policies. You can modify them in the Supabase dashboard under Authentication > Policies.

## Database Schema

### Orders Table

| Field | Type | Description |
|-------|------|-------------|
| id | SERIAL | Primary key |
| order_id | VARCHAR(50) | Unique order identifier |
| customer_name | VARCHAR(255) | Customer's full name |
| customer_email | VARCHAR(255) | Customer's email (optional) |
| delivery_speed | VARCHAR(50) | Delivery time (Standard, Express, Ultra Express) |
| service | TEXT | Description of the service ordered |
| amount | DECIMAL(10,2) | Order amount in USD |
| payment_status | VARCHAR(50) | Payment status (Pending, Completed, Failed, Refunded) |
| order_status | VARCHAR(50) | Order status (Pending, Processing, In Progress, Completed, Cancelled) |
| platform | VARCHAR(20) | Gaming platform (PC, Xbox, PlayStation) |
| service_type | VARCHAR(50) | Type of service (Money Boost, Rank Boost, etc.) |
| service_details | JSONB | Additional service-specific details |
| customer_notes | TEXT | Customer's special instructions |
| admin_notes | TEXT | Internal admin notes |
| created_at | TIMESTAMP | Order creation time |
| updated_at | TIMESTAMP | Last update time |
| estimated_completion | TIMESTAMP | Estimated completion time |
| completed_at | TIMESTAMP | Actual completion time |

## Usage

### Creating Orders

Use the `useOrderSubmission` hook in your purchase pages:

```tsx
import { useOrderSubmission } from '@/hooks/useOrderSubmission';

const { submitOrder, submitting, error } = useOrderSubmission();

const handleSubmit = async (formData) => {
  const result = await submitOrder(formData);
  if (result.success) {
    // Handle success
    console.log('Order ID:', result.orderId);
  }
};
```

### Admin Panel

The admin panel at `/admin/orders` displays all orders with:
- Real-time data from Supabase
- Search and filter functionality
- Export to CSV
- Order status updates

### Order Service

Use the `OrderService` class for database operations:

```tsx
import { OrderService } from '@/lib/orderService';

// Get all orders
const { data, error } = await OrderService.getAllOrders();

// Update order status
await OrderService.updateOrderStatus(orderId, 'Completed');

// Search orders
const results = await OrderService.searchOrders('john@example.com');
```

## File Structure

```
├── supabase/
│   └── create-orders-table.sql     # Database schema
├── types/
│   ├── order.ts                    # Order type definitions
│   └── supabase.ts                 # Database type definitions
├── lib/
│   ├── supabase.ts                 # Supabase client configuration
│   └── orderService.ts             # Order database operations
├── hooks/
│   └── useOrderSubmission.ts       # Order submission hook
└── app/
    ├── admin/orders/page.tsx       # Admin orders panel
    └── buy-*/page.tsx              # Purchase pages with order integration
```

## Features

### For Customers
- Easy order submission form
- Order tracking by email
- Multiple delivery speed options
- Platform-specific services

### For Admins
- Comprehensive order management
- Real-time order status updates
- Search and filter orders
- Export functionality
- Order statistics dashboard

## Security

- Row Level Security (RLS) enabled
- Admin-only access to sensitive operations
- Secure environment variable configuration
- Type-safe database operations

## Next Steps

1. **Payment Integration**: Add Stripe or PayPal integration
2. **Email Notifications**: Set up automated email notifications
3. **Customer Portal**: Create customer login and order tracking
4. **Analytics**: Add order analytics and reporting
5. **Webhooks**: Set up webhooks for payment processing

## Troubleshooting

### Common Issues

1. **Cannot find module '@supabase/supabase-js'**
   - Run `npm install @supabase/supabase-js`

2. **Environment variables not found**
   - Make sure `.env.local` exists and contains the correct keys
   - Restart your development server after adding env variables

3. **Database connection issues**
   - Verify your Supabase URL and keys are correct
   - Check that your Supabase project is active

4. **RLS policies blocking access**
   - Review the RLS policies in your Supabase dashboard
   - Make sure the policies match your authentication setup

## Support

For issues with this integration, check:
1. Supabase documentation: https://supabase.com/docs
2. Next.js documentation: https://nextjs.org/docs
3. Your Supabase project logs in the dashboard
