export interface CartItem {
  id: string;
  service: string;
  amount: number;
  price: number;
  platform: 'PC' | 'Xbox' | 'PlayStation';
  deliverySpeed: 'Standard' | 'Express' | 'Ultra Express';
  deliveryCost: number;
  serviceType: string;
  serviceDetails: {
    [key: string]: any;
  };
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CheckoutData {
  customerName: string;
  customerEmail: string;
  customerNotes?: string;
  gtaAccountEmail: string;
  gtaAccountPassword: string;
}
