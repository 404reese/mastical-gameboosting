'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign, CheckCircle, CreditCard, Loader2 } from 'lucide-react';
import { useOrderSubmission } from '@/hooks/useOrderSubmission';

export default function BuyCreditsForPcPage() {
  const [creditPackage, setCreditPackage] = useState('shark-card-megalodon');
  const [deliveryTime, setDeliveryTime] = useState('24h');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  
  const { submitOrder, submitting, error, clearError } = useOrderSubmission();
  
  const creditPackages = {
    'shark-card-megalodon': { name: 'Megalodon Shark Card', amount: '$8,000,000', price: 7.99 },
    'shark-card-whale': { name: 'Whale Shark Card', amount: '$3,500,000', price: 4.99 },
    'shark-card-great-white': { name: 'Great White Shark Card', amount: '$1,250,000', price: 2.99 },
    'custom-credits': { name: 'Custom Credits', amount: 'Variable', price: 9.99 }
  };
  
  const selectedPackage = creditPackages[creditPackage as keyof typeof creditPackages];
  const deliveryMultiplier = deliveryTime === '1h' ? 2 : deliveryTime === '6h' ? 1.5 : 1;
  const totalPrice = (selectedPackage.price * deliveryMultiplier).toFixed(2);

  const handlePurchaseClick = () => {
    clearError();
    setShowOrderForm(true);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName.trim()) {
      return;
    }

    const orderData = {
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim() || undefined,
      deliverySpeed: deliveryTime === '1h' ? '1 Hour' : deliveryTime === '6h' ? '6 Hours' : '24 Hours',
      service: `PC Credits - ${selectedPackage.name}`,
      amount: parseFloat(totalPrice),
      platform: 'PC',
      serviceType: 'Credits',
      serviceDetails: {
        creditType: selectedPackage.name,
        creditAmount: selectedPackage.amount,
        deliveryTime: deliveryTime,
        originalPrice: selectedPackage.price,
        deliveryMultiplier: deliveryMultiplier
      },
      customerNotes: customerNotes.trim() || undefined,
    };

    const result = await submitOrder(orderData);
    
    if (result.success) {
      // Show success message and redirect or show order details
      alert(`Order submitted successfully! Order ID: ${result.orderId}`);
      setShowOrderForm(false);
      // Reset form
      setCustomerName('');
      setCustomerEmail('');
      setCustomerNotes('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary">PC Platform</Badge>
            <h1 className="font-impact text-5xl mb-6 text-glow">
              GTA5 Credits - PC
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Purchase GTA5 Shark Cards and credits for PC. Instant delivery of premium 
              currency for all your GTA Online purchases.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <Card className="bg-[#1C1C1C] border-border/40 card-glow">
              <CardHeader>
                <CardTitle className="font-impact text-2xl flex items-center">
                  <CreditCard className="mr-2 h-6 w-6 text-primary" />
                  Select Credit Package
                </CardTitle>
                <CardDescription>
                  Choose from official Shark Cards or custom credit amounts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div>
                  <label className="block text-sm font-medium mb-2">Credit Package</label>
                  <Select value={creditPackage} onValueChange={setCreditPackage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select credit package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shark-card-megalodon">
                        Megalodon Shark Card - $8,000,000
                      </SelectItem>
                      <SelectItem value="shark-card-whale">
                        Whale Shark Card - $3,500,000
                      </SelectItem>
                      <SelectItem value="shark-card-great-white">
                        Great White Shark Card - $1,250,000
                      </SelectItem>
                      <SelectItem value="custom-credits">
                        Custom Credits - Variable Amount
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Time</label>
                  <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 Hour (+100%)</SelectItem>
                      <SelectItem value="6h">6 Hours (+50%)</SelectItem>
                      <SelectItem value="24h">24 Hours (Standard)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-background/50 p-4 rounded-lg border border-border/40">
                  <div className="mb-2">
                    <h3 className="font-semibold">{selectedPackage.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      GTA$ {selectedPackage.amount}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Price:</span>
                    <span className="text-3xl font-bold text-primary">${totalPrice}</span>
                  </div>
                </div>

                {!showOrderForm ? (
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-3"
                    onClick={handlePurchaseClick}
                  >
                    <DollarSign className="mr-2 h-5 w-5" />
                    Purchase Credits - ${totalPrice}
                  </Button>
                ) : (
                  <Card className="bg-background/50 border-border/40">
                    <CardHeader>
                      <CardTitle className="text-lg">Complete Your Order</CardTitle>
                      <CardDescription>
                        Please provide your details to complete the purchase.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleOrderSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="customerName">Name *</Label>
                          <Input
                            id="customerName"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="customerEmail">Email (Optional)</Label>
                          <Input
                            id="customerEmail"
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder="your.email@example.com"
                          />
                        </div>

                        <div>
                          <Label htmlFor="customerNotes">Special Instructions (Optional)</Label>
                          <Textarea
                            id="customerNotes"
                            value={customerNotes}
                            onChange={(e) => setCustomerNotes(e.target.value)}
                            placeholder="Any special requests or notes..."
                            rows={3}
                          />
                        </div>

                        {error && (
                          <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm">
                            {error}
                          </div>
                        )}

                        <div className="flex space-x-3">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setShowOrderForm(false)}
                            className="flex-1"
                          >
                            Back
                          </Button>
                          <Button 
                            type="submit" 
                            disabled={submitting || !customerName.trim()}
                            className="flex-1"
                          >
                            {submitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                <DollarSign className="mr-2 h-4 w-4" />
                                Submit Order
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl">What You Get</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Instant Credits</h4>
                      <p className="text-xs text-muted-foreground">
                        Credits added directly to your GTA Online account
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Official Shark Cards</h4>
                      <p className="text-xs text-muted-foreground">
                        Legitimate Rockstar Shark Card values
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">No Restrictions</h4>
                      <p className="text-xs text-muted-foreground">
                        Use credits for any GTA Online purchases
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Account Safe</h4>
                      <p className="text-xs text-muted-foreground">
                        100% safe delivery methods
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl">Popular Uses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">• Purchase expensive vehicles and properties</div>
                  <div className="text-sm">• Buy weapons, ammunition, and modifications</div>
                  <div className="text-sm">• Invest in businesses and upgrades</div>
                  <div className="text-sm">• Customize characters and outfits</div>
                  <div className="text-sm">• Access premium content and DLCs</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}