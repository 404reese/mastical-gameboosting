# PayPal Integration Setup Guide

This guide will help you set up PayPal checkout integration for your gaming boost service.

## 1. PayPal Developer Account Setup

1. Go to [PayPal Developer](https://developer.paypal.com/)
2. Log in with your PayPal account or create a new one
3. Navigate to "My Apps & Credentials"
4. Create a new app:
   - Choose "Default Application" or create a custom name
   - Select your merchant account
   - Choose "Sandbox" for testing or "Live" for production

## 2. Environment Variables

Copy the `.env.local.template` file to `.env.local` and fill in your PayPal credentials:

```bash
cp .env.local.template .env.local
```

Update the following variables in `.env.local`:

```env
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
PAYPAL_ENVIRONMENT=sandbox  # Use 'live' for production
```

### Getting Your Credentials:

1. **Client ID**: Found in your PayPal app dashboard (this is public)
2. **Client Secret**: Found in your PayPal app dashboard (keep this secret)
3. **Environment**: 
   - Use `sandbox` for testing
   - Use `live` for production

## 3. Features Implemented

### Cart Integration
- PayPal checkout button integrated directly in the cart sidebar
- Automatic cart total calculation
- Cart clearing after successful payment

### Payment Flow
1. User adds items to cart
2. Clicks PayPal button in cart sidebar
3. PayPal popup opens with order details
4. User completes payment
5. Order is verified with PayPal
6. User is redirected to success page
7. Cart is automatically cleared

### API Endpoints
- `/api/paypal/verify` - Verifies PayPal orders server-side

### Pages Created
- `/checkout/success` - Payment success page
- `/checkout/cancel` - Payment cancellation page

## 4. Testing

### Sandbox Testing
1. Set `PAYPAL_ENVIRONMENT=sandbox` in your `.env.local`
2. Use PayPal sandbox test accounts from your developer dashboard
3. Test the complete payment flow

### Test Card Details
PayPal provides test accounts in your sandbox dashboard. You can also use these test card numbers:
- Visa: 4111111111111111
- Mastercard: 5555555555554444
- Amex: 378282246310005

## 5. Production Deployment

1. Switch to live credentials:
   ```env
   PAYPAL_ENVIRONMENT=live
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_live_client_id
   PAYPAL_CLIENT_SECRET=your_live_client_secret
   ```

2. Update your PayPal app to "Live" mode in the PayPal developer dashboard

3. Test thoroughly before going live

## 6. Security Considerations

- Never expose your `PAYPAL_CLIENT_SECRET` in client-side code
- Always verify payments server-side
- Implement proper error handling
- Use HTTPS in production
- Validate all payment amounts and order details

## 7. Customization

### PayPal Button Styling
The PayPal button can be customized in `components/PayPalCheckout.tsx`:

```tsx
style={{
  layout: "vertical",
  color: "gold",      // gold, blue, silver, white, black
  shape: "rect",      // rect, pill
  label: "paypal",    // paypal, checkout, buynow, pay
  height: 45,         // 25-55
}}
```

### Order Processing
Add your custom order processing logic in:
- `app/api/paypal/verify/route.ts` - Server-side verification
- `components/PayPalCheckout.tsx` - Client-side success handling

## 8. Error Handling

The integration includes comprehensive error handling:
- Network errors
- PayPal API errors
- Validation errors
- User cancellation

All errors are logged and user-friendly messages are displayed.

## 9. Support

For PayPal-specific issues:
- [PayPal Developer Documentation](https://developer.paypal.com/docs/)
- [PayPal Developer Community](https://developer.paypal.com/community/)

For integration issues:
- Check browser console for error messages
- Verify environment variables are set correctly
- Ensure PayPal app is configured for correct environment
