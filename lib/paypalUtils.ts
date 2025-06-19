import { Cart } from '@/types/cart';

export interface PayPalOrderData {
  total: number;
  itemTotal: number;
  taxTotal: number;
  shippingTotal: number;
  handlingTotal: number;
  discountTotal: number;
  items: Array<{
    name: string;
    unit_amount: {
      currency_code: string;
      value: string;
    };
    quantity: string;
    description: string;
    category: string;
    sku: string;
  }>;
}

/**
 * Enhanced PayPal order creation with better error handling
 */
export function createPayPalOrderData(cart: Cart): PayPalOrderData {
  if (!cart || !cart.items || cart.items.length === 0) {
    throw new Error('Cart is empty or invalid');
  }

  // Map cart items to PayPal format with strict validation
  const items = cart.items.map((item, index) => {
    if (!item.price || item.price < 0) {
      throw new Error(`Invalid price for item ${index}: ${item.price}`);
    }
    if (!item.quantity || item.quantity < 1) {
      throw new Error(`Invalid quantity for item ${index}: ${item.quantity}`);
    }

    const unitPrice = Math.round((item.price + item.deliveryCost) * 100) / 100; // Round to 2 decimal places
    
    return {
      name: (item.service || 'Gaming Service').substring(0, 127),
      unit_amount: {
        currency_code: "USD",
        value: unitPrice.toFixed(2),
      },
      quantity: item.quantity.toString(),
      description: `${item.platform || 'Gaming'} - ${item.deliverySpeed || 'Standard'}${item.amount ? ` - ${item.amount}M` : ''}`.substring(0, 127),
      category: "DIGITAL_GOODS" as const,
      sku: `item_${index}_${Date.now()}`,
    };
  });

  // Calculate exact totals with proper rounding
  const itemTotal = Math.round(cart.items.reduce((total, item) => {
    const unitPrice = Math.round((item.price + item.deliveryCost) * 100) / 100;
    return total + (unitPrice * item.quantity);
  }, 0) * 100) / 100;

  const taxTotal = 0;
  const shippingTotal = 0; 
  const handlingTotal = 0;
  const discountTotal = 0;
  const total = Math.round((itemTotal + taxTotal + shippingTotal + handlingTotal - discountTotal) * 100) / 100;

  if (total <= 0) {
    throw new Error('Order total must be greater than 0');
  }

  return {
    total,
    itemTotal,
    taxTotal,
    shippingTotal,
    handlingTotal,
    discountTotal,
    items,
  };
}

/**
 * Validates PayPal order data to prevent common errors
 */
export function validatePayPalOrderData(orderData: PayPalOrderData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check if total matches breakdown
  const calculatedTotal = orderData.itemTotal + orderData.taxTotal + orderData.shippingTotal + orderData.handlingTotal - orderData.discountTotal;
  if (Math.abs(calculatedTotal - orderData.total) > 0.01) {
    errors.push(`Total mismatch: expected ${calculatedTotal.toFixed(2)}, got ${orderData.total.toFixed(2)}`);
  }

  // Check if item total matches sum of line items
  const lineItemsTotal = orderData.items.reduce((total, item) => {
    return total + (parseFloat(item.unit_amount.value) * parseInt(item.quantity));
  }, 0);
  
  if (Math.abs(lineItemsTotal - orderData.itemTotal) > 0.01) {
    errors.push(`Item total mismatch: line items total ${lineItemsTotal.toFixed(2)}, breakdown item_total ${orderData.itemTotal.toFixed(2)}`);
  }

  // Check for empty items
  if (orderData.items.length === 0) {
    errors.push('No items in order');
  }

  // Check for zero total
  if (orderData.total <= 0) {
    errors.push('Order total must be greater than 0');
  }

  // Check item name length
  orderData.items.forEach((item, index) => {
    if (item.name.length > 127) {
      errors.push(`Item ${index} name exceeds 127 characters`);
    }
    if (item.description.length > 127) {
      errors.push(`Item ${index} description exceeds 127 characters`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
