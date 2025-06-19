'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useOrderSubmission } from '@/hooks/useOrderSubmission';
import { CheckoutData } from '@/types/cart';
import PayPalCheckoutNew from '@/components/PayPalCheckoutNew';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { submitOrder, submitting, error } = useOrderSubmission();

  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    customerName: '',
    customerEmail: '',
    customerNotes: '',
    gtaAccountEmail: '',
    gtaAccountPassword: '',
  });
    const [createdOrderIds, setCreatedOrderIds] = useState<string[]>([]);
  const [ordersCreated, setOrdersCreated] = useState(false);
  const [creatingOrders, setCreatingOrders] = useState(false);
  const [orderCreationError, setOrderCreationError] = useState<string | null>(null);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const handleInputChange = (field: keyof CheckoutData, value: string) => {
    setCheckoutData(prev => ({ ...prev, [field]: value }));
  };

  // Check if all required customer information is filled
  const isCustomerInfoComplete = 
    checkoutData.customerName.trim() !== '' &&
    checkoutData.customerEmail.trim() !== '' &&
    checkoutData.gtaAccountEmail.trim() !== '' &&
    checkoutData.gtaAccountPassword.trim() !== '';
  // Create orders in database as soon as customer info is complete
  const createOrdersInDatabase = async () => {
    if (!isCustomerInfoComplete || ordersCreated || cart.items.length === 0 || creatingOrders) {
      return;
    }

    try {
      setCreatingOrders(true);
      setOrderCreationError(null);
      console.log('Creating orders in database...');
      
      const orderPromises = cart.items.map(async (item) => {
        // Extract GTA account credits from service details or amount
        const gtaAccountCredits = item.serviceDetails?.moneyAmount || 
                                  item.serviceDetails?.cashAmount || 
                                  item.serviceDetails?.creditAmount || 
                                  item.amount || 0;

        const orderData = {
          customerName: checkoutData.customerName,
          customerEmail: checkoutData.customerEmail,
          deliverySpeed: item.deliverySpeed,
          service: item.service,
          amount: item.price + item.deliveryCost,
          platform: item.platform,
          serviceType: item.serviceType,
          serviceDetails: {
            ...item.serviceDetails,
            quantity: item.quantity,
            moneyAmount: item.amount,
            cart_item_id: item.id,
          },
          customerNotes: checkoutData.customerNotes,
          gtaAccountEmail: checkoutData.gtaAccountEmail,
          gtaAccountPassword: checkoutData.gtaAccountPassword,
          gtaAccountCredits: gtaAccountCredits,
        };        // Create order with pending payment status initially
        // Payment status can be updated automatically by PayPal verification or manually by admin
        return submitOrder(orderData, 'Pending', 'Pending');
      });

      const results = await Promise.all(orderPromises);
      const successfulOrders = results.filter(result => result.success);
      const orderIds = successfulOrders.map(result => result.orderId).filter(Boolean) as string[];
      
      if (successfulOrders.length === cart.items.length) {
        setCreatedOrderIds(orderIds);
        setOrdersCreated(true);
        console.log('All orders created successfully with pending payment status:', orderIds);
      } else {
        console.error('Some orders failed to create');
        setOrderCreationError('Some orders failed to create. Please try again.');
      }
    } catch (err) {
      console.error('Error creating orders:', err);
      setOrderCreationError('Failed to create orders. Please try again.');
    } finally {
      setCreatingOrders(false);
    }
  };

  // Auto-create orders when customer info is complete
  useEffect(() => {
    if (isCustomerInfoComplete && !ordersCreated && cart.items.length > 0) {
      createOrdersInDatabase();
    }
  }, [isCustomerInfoComplete, ordersCreated, cart.items.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This function is now mainly for manual order creation if auto-creation failed
    if (!ordersCreated) {
      await createOrdersInDatabase();
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-6">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some services to your cart to proceed with checkout</p>
          <Button asChild>
            <Link href="/buy/gta-5-boost">Browse Services</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="font-impact text-4xl">Checkout</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Customer Information */}
              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl">Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        id="customerName"
                        value={checkoutData.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="customerEmail">Email Address *</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        value={checkoutData.customerEmail}
                        onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                        required
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="border-t border-border/40 pt-4 mt-6">
                      <h3 className="font-semibold text-lg mb-3 flex items-center">
                        <Shield className="mr-2 h-4 w-4 text-green-500" />
                        GTA Account Information
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        We need access to your GTA account to perform the boosting service. Your credentials are encrypted and secure.
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="gtaAccountEmail">GTA Account Email *</Label>
                          <Input
                            id="gtaAccountEmail"
                            type="email"
                            value={checkoutData.gtaAccountEmail}
                            onChange={(e) => handleInputChange('gtaAccountEmail', e.target.value)}
                            required
                            placeholder="your-gta-account@example.com"
                          />
                        </div>

                        <div>
                          <Label htmlFor="gtaAccountPassword">GTA Account Password *</Label>
                          <Input
                            id="gtaAccountPassword"
                            type="password"
                            value={checkoutData.gtaAccountPassword}
                            onChange={(e) => handleInputChange('gtaAccountPassword', e.target.value)}
                            required
                            placeholder="Your GTA account password"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Your password is encrypted and only used for the boosting service.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="customerNotes">Special Instructions (Optional)</Label>
                      <Textarea
                        id="customerNotes"
                        value={checkoutData.customerNotes}
                        onChange={(e) => handleInputChange('customerNotes', e.target.value)}
                        placeholder="Any special requirements or notes..."
                        rows={3}
                      />
                    </div>                    <div className="pt-4 space-y-4">
                      {/* Payment Section */}
                      <div className="space-y-3">                        <div className="text-center">
                          <h3 className="text-lg font-semibold mb-2">Payment</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {!isCustomerInfoComplete 
                              ? "Please fill in all required customer information above to proceed with payment"
                              : creatingOrders
                                ? "Creating orders in database..."
                                : ordersCreated 
                                  ? "Orders created successfully! Complete your payment below."
                                  : "Complete your order with secure PayPal payment"
                            }
                          </p>
                          {creatingOrders && (
                            <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3 mb-4">
                              <p className="text-blue-400 text-sm flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating orders...
                              </p>
                            </div>
                          )}
                          {ordersCreated && (
                            <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3 mb-4">
                              <p className="text-green-400 text-sm">
                                ✓ Orders created in database ({createdOrderIds.length} orders)
                              </p>
                            </div>
                          )}
                          {orderCreationError && (
                            <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-3 mb-4">
                              <p className="text-red-400 text-sm">
                                ✗ {orderCreationError}
                              </p>
                              <button 
                                onClick={() => {
                                  setOrderCreationError(null);
                                  createOrdersInDatabase();
                                }}
                                className="text-red-300 hover:text-red-200 text-xs underline mt-1"
                              >
                                Try again
                              </button>
                            </div>
                          )}
                        </div>
                        
                        {/* PayPal Checkout */}
                        <div className={`p-4 border border-border/40 rounded-lg transition-opacity ${
                          isCustomerInfoComplete ? 'bg-background/50' : 'bg-background/20 opacity-50'
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">Pay with PayPal</h4>
                              <Shield className="h-4 w-4 text-green-500" />
                            </div>
                            <Badge variant="secondary">Secure Payment</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Secure, fast payment. No need to enter card details.
                          </p>                          {isCustomerInfoComplete && !creatingOrders ? (
                            <PayPalCheckoutNew 
                              onSuccess={(paypalOrderId: string) => {
                                console.log('PayPal payment successful:', paypalOrderId);
                                clearCart();
                                router.push(`/checkout/success?order_id=${paypalOrderId}&db_orders=${createdOrderIds.join(',')}`);
                              }}
                              onError={(error: any) => {
                                console.error('PayPal payment error:', error);
                              }}
                              checkoutData={checkoutData}
                              createdOrderIds={createdOrderIds}
                              disabled={creatingOrders}
                            />
                          ) : (
                            <Button 
                              disabled 
                              size="lg" 
                              className="w-full bg-muted text-muted-foreground cursor-not-allowed"
                            >
                              <CreditCard className="mr-2 h-5 w-5" />
                              Complete Customer Information First
                            </Button>
                          )}
                        </div>
                      </div>

                      {error && (
                        <p className="text-destructive text-sm mt-2">{error}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <div className="space-y-6">
                <Card className="bg-[#1C1C1C] border-border/40">
                  <CardHeader>
                    <CardTitle className="font-impact text-xl">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cart.items.map((item) => (
                      <div key={item.id} className="border-b border-border/40 pb-4 last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{item.service}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {item.platform}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {item.deliverySpeed}
                              </Badge>
                            </div>
                            {item.amount && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Amount: {item.amount} Million
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold">
                              {formatPrice((item.price + item.deliveryCost) * item.quantity)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="border-t border-border/40 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-primary">
                          {formatPrice(cart.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security & Guarantees */}
                <Card className="bg-[#1C1C1C] border-border/40">
                  <CardHeader>
                    <CardTitle className="font-impact text-xl flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-green-500" />
                      Security & Guarantees
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>100% account safety guaranteed</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>Fast delivery as promised</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CreditCard className="h-4 w-4 text-purple-500" />
                      <span>Secure payment processing</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}