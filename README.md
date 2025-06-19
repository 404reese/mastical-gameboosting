## PayPal Integration

This project includes PayPal checkout integration for seamless payment processing.

### Quick Setup

1. **Install dependencies** (already done):
   ```bash
   npm install @paypal/react-paypal-js
   ```

2. **Set up environment variables**:
   Copy `.env.local.template` to `.env.local` and add your PayPal credentials:
   ```env
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   PAYPAL_ENVIRONMENT=sandbox
   ```

3. **Get PayPal credentials** from [PayPal Developer](https://developer.paypal.com/)

### Features

- ✅ PayPal checkout button in cart sidebar
- ✅ Automatic order verification
- ✅ Success/cancel page handling
- ✅ Cart clearing after payment
- ✅ Toast notifications
- ✅ Error handling

### Files Modified/Added

- `components/PayPalCheckout.tsx` - Main PayPal integration component
- `components/CartSidebar.tsx` - Updated with PayPal button
- `app/api/paypal/verify/route.ts` - Server-side verification
- `app/checkout/success/page.tsx` - Payment success page
- `app/checkout/cancel/page.tsx` - Payment cancel page
- `lib/env.ts` - Updated with PayPal environment variables
- `.env.local.template` - Environment variable template

See `PAYPAL_SETUP.md` for detailed setup instructions.

---