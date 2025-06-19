export interface OrderData {
  id: string;
  paypalOrderId: string;
  items: Array<{
    service: string;
    platform: string;
    quantity: number;
    price: number;
    deliverySpeed: string;
    amount?: string;
  }>;
  totalAmount: number;
  customerEmail?: string;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  createdAt: Date;
  completedAt?: Date;
}

export interface PayPalOrderDetails {
  id: string;
  status: string;
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
    description: string;
    custom_id: string;
    invoice_id: string;
  }>;
  payer: {
    email_address?: string;
    name?: {
      given_name: string;
      surname: string;
    };
  };
  create_time: string;
  update_time: string;
}

export interface PayPalCreateOrderRequest {
  intent: 'CAPTURE';
  purchase_units: Array<{
    reference_id?: string;
    amount: {
      currency_code: string;
      value: string;
      breakdown?: {
        item_total?: {
          currency_code: string;
          value: string;
        };
        tax_total?: {
          currency_code: string;
          value: string;
        };
        shipping?: {
          currency_code: string;
          value: string;
        };
        handling?: {
          currency_code: string;
          value: string;
        };
        discount?: {
          currency_code: string;
          value: string;
        };
      };
    };
    description?: string;
    custom_id?: string;
    invoice_id?: string;
    items?: Array<{
      name: string;
      unit_amount: {
        currency_code: string;
        value: string;
      };
      quantity: string;
      description?: string;
      category?: 'DIGITAL_GOODS' | 'PHYSICAL_GOODS';
      sku?: string;
    }>;
    payee?: {
      email_address?: string;
      merchant_id?: string;
    };
  }>;
  application_context?: {
    brand_name?: string;
    landing_page?: 'LOGIN' | 'BILLING' | 'NO_PREFERENCE';
    shipping_preference?: 'GET_FROM_FILE' | 'NO_SHIPPING' | 'SET_PROVIDED_ADDRESS';
    user_action?: 'CONTINUE' | 'PAY_NOW';
    payment_method?: {
      payer_selected?: string;
      payee_preferred?: 'UNRESTRICTED' | 'IMMEDIATE_PAYMENT_REQUIRED';
    };
    return_url?: string;
    cancel_url?: string;
  };
}

export interface PayPalCaptureResponse {
  id: string;
  status: 'CREATED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'COMPLETED' | 'PAYER_ACTION_REQUIRED';
  payment_source?: {
    paypal?: {
      email_address?: string;
      account_id?: string;
      name?: {
        given_name?: string;
        surname?: string;
      };
    };
  };
  purchase_units: Array<{
    reference_id?: string;
    payments: {
      captures: Array<{
        id: string;
        status: 'COMPLETED' | 'DECLINED' | 'PARTIALLY_REFUNDED' | 'PENDING' | 'REFUNDED';
        amount: {
          currency_code: string;
          value: string;
        };
        final_capture?: boolean;
        seller_protection?: {
          status: string;
          dispute_categories: string[];
        };
        create_time: string;
        update_time: string;
      }>;
    };
  }>;
}
