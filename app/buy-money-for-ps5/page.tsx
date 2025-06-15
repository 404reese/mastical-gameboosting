'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Clock, Star, DollarSign, CheckCircle } from 'lucide-react';

export default function BuyMoneyForPs5Page() {
  // Define money packages (adjust prices as needed)
  const moneyPackages: { amount: number; label: string; price: number }[] = [
    { amount: 10, label: '10 Million', price: 8 },
    { amount: 15, label: '15 Million', price: 10 },
    { amount: 20, label: '20 Million', price: 12 },
    { amount: 25, label: '25 Million', price: 14 },
    { amount: 30, label: '30 Million', price: 16 },
    { amount: 40, label: '40 Million', price: 18 },
    { amount: 50, label: '50 Million', price: 20 },
    { amount: 60, label: '60 Million', price: 22 },
    { amount: 75, label: '75 Million', price: 25 },
    { amount: 100, label: '100 Million', price: 35 },
    { amount: 150, label: '150 Million', price: 52 },
    { amount: 200, label: '200 Million', price: 64 }
  ];

  type DeliveryTime = 'standard' | 'express' | 'ultraExpress';
  const [selectedPackage, setSelectedPackage] = useState<typeof moneyPackages[0] | undefined>(moneyPackages[0]);
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime>('standard');
  const [psVersion, setPsVersion] = useState('ps5');

  const deliveryCosts: Record<DeliveryTime, number> = {
    standard: 0,
    express: 5,
    ultraExpress: 10
  };
  const totalPrice = ((selectedPackage?.price ?? 0) + deliveryCosts[deliveryTime]).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section
        className="py-20 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/moneyboostcover.jpeg')" }}
      >
        {/* Black Tint Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-500/20 text-blue-400">
              PS Platform
            </Badge>
            <h1 className="font-impact text-5xl mb-6 text-white">
              GTA5 Money Boost - PS
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get millions in GTA5 cash instantly for PS. Safe, reliable, and
              fast delivery with professional support. No account sharing
              required.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <Card className="bg-[#1C1C1C] border-border/40 card-glow">
              <CardHeader>
                <CardTitle className="font-impact text-2xl">Customize Your PlayStation Order</CardTitle>
                <CardDescription>
                  Select all your preferences for the perfect PlayStation experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Money Amount as buttons */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Money Amount: {selectedPackage?.label ?? 'N/A'} (${selectedPackage?.price ?? '0'})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {moneyPackages.map(pkg => (
                      <Button
                        key={pkg.amount}
                        type="button"
                        variant={selectedPackage?.amount === pkg.amount ? "default" : "outline"}
                        className={`px-4 py-2 text-sm ${selectedPackage?.amount === pkg.amount ? "ring-2 ring-primary" : ""}`}
                        onClick={() => setSelectedPackage(pkg)}
                      >
                        {pkg.label} - ${pkg.price}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">PlayStation Console</label>
                  <Select value={psVersion} onValueChange={setPsVersion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select PlayStation console" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ps5">PlayStation 5</SelectItem>
                      <SelectItem value="ps4-pro">PlayStation 4 Pro</SelectItem>
                      <SelectItem value="ps4">PlayStation 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Delivery Time as buttons */}
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Time</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant={deliveryTime === 'standard' ? "default" : "outline"}
                      className={`px-4 py-2 text-sm ${deliveryTime === 'standard' ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setDeliveryTime('standard')}
                    >
                      Standard (24h-72h) $0
                    </Button>
                    <Button
                      type="button"
                      variant={deliveryTime === 'express' ? "default" : "outline"}
                      className={`px-4 py-2 text-sm ${deliveryTime === 'express' ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setDeliveryTime('express')}
                    >
                      Express (12-24h) $5
                    </Button>
                    <Button
                      type="button"
                      variant={deliveryTime === 'ultraExpress' ? "default" : "outline"}
                      className={`px-4 py-2 text-sm ${deliveryTime === 'ultraExpress' ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setDeliveryTime('ultraExpress')}
                    >
                      Ultra Express (≤12h) $10
                    </Button>
                  </div>
                </div>

                <div className="bg-background/50 p-4 rounded-lg border border-border/40">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Price:</span>
                    <span className="text-3xl font-bold text-primary">${totalPrice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Includes {selectedPackage?.label ?? 'N/A'} GTA5 cash for PlayStation
                  </p>
                </div>

                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg py-3">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Add to Cart - ${totalPrice}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl">PlayStation-Specific Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">PS Plus Compatible</h4>
                      <p className="text-xs text-muted-foreground">Works with all PlayStation Plus subscriptions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">PS5 Enhanced</h4>
                      <p className="text-xs text-muted-foreground">Optimized for PlayStation 5 performance</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Cross-Generation</h4>
                      <p className="text-xs text-muted-foreground">Compatible with PS4 and PS5 versions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Regional Support</h4>
                      <p className="text-xs text-muted-foreground">Available in all PlayStation regions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl">Service Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Account Safety</span>
                    <span className="text-green-400">100% Guaranteed</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Method</span>
                    <span className="text-muted-foreground">Professional Boost</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Support</span>
                    <span className="text-muted-foreground">24/7 Available</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Refund Policy</span>
                    <span className="text-muted-foreground">Money Back Guarantee</span>
                  </div>
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