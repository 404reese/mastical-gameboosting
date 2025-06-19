import { useState } from 'react';
import { OrderService } from '@/lib/orderService';
import { OrderFormData } from '@/types/order';

export const useOrderSubmission = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitOrder = async (
    formData: OrderFormData,
    paymentStatus?: 'Pending' | 'Completed',
    orderStatus?: 'Pending' | 'Processing'
  ) => {
    try {
      setSubmitting(true);
      setError(null);      // Transform form data to match order insert type
      const orderData = {
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        delivery_speed: formData.deliverySpeed as any,
        service: formData.service,
        amount: formData.amount,
        platform: formData.platform as any,
        service_type: formData.serviceType,
        service_details: formData.serviceDetails,
        customer_notes: formData.customerNotes,
        gta_account_email: formData.gtaAccountEmail,
        gta_account_password: formData.gtaAccountPassword,
        gta_account_credits: formData.gtaAccountCredits,
        payment_status: paymentStatus || 'Pending',
        order_status: orderStatus || 'Pending',
      };

      const { data, error } = await OrderService.createOrder(orderData);

      if (error) {
        setError('Failed to submit order. Please try again.');
        return { success: false, orderId: null };
      }

      return { success: true, orderId: data?.order_id || null };
    } catch (err) {
      setError('Unexpected error occurred. Please try again.');
      return { success: false, orderId: null };
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitOrder,
    submitting,
    error,
    clearError: () => setError(null),
  };
};
