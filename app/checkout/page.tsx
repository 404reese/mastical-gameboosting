'use client';

import { useState } from 'react';
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
  });

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const handleInputChange = (field: keyof CheckoutData, value: string) => {
    setCheckoutData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Create orders for each cart item
    const orderPromises = cart.items.map(async (item) => {
      const orderData = {
        customerName: checkoutData.customerName,
        customerEmail: checkoutData.customerEmail,
        deliverySpeed: item.deliverySpeed as any,
        service: item.service,
        amount: item.price + item.deliveryCost,
        platform: item.platform as any,
        serviceType: item.serviceType,
        serviceDetails: {
          ...item.serviceDetails,
          quantity: item.quantity,
          moneyAmount: item.amount,
        },
        customerNotes: checkoutData.customerNotes,
      };

      return submitOrder(orderData);
    });

    try {
      const results = await Promise.all(orderPromises);
      const allSuccessful = results.every(result => result.success);

      if (allSuccessful) {
        clearCart();
        alert('Orders submitted successfully! You will receive email confirmations shortly.');
        router.push('/');
      } else {
        alert('Some orders failed to submit. Please try again.');
      }
    } catch (err) {
      alert('An error occurred while processing your orders. Please try again.');
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
                  <form onSubmit={handleSubmit} className="space-y-4">
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

                    <div>
                      <Label htmlFor="customerNotes">Special Instructions (Optional)</Label>
                      <Textarea
                        id="customerNotes"
                        value={checkoutData.customerNotes}
                        onChange={(e) => handleInputChange('customerNotes', e.target.value)}
                        placeholder="Any special requirements or notes..."
                        rows={3}
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={submitting}
                      >
                        <CreditCard className="mr-2 h-5 w-5" />
                        {submitting ? 'Processing...' : `Place Order - ${formatPrice(cart.totalPrice)}`}
                      </Button>

                      {error && (
                        <p className="text-destructive text-sm mt-2">{error}</p>
                      )}
                    </div>
                  </form>
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
