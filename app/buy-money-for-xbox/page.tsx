'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Clock, Star, DollarSign, CheckCircle } from 'lucide-react';

export default function BuyMoneyForXboxPage() {
  // Define money packages (adjust prices as needed for Xbox)
  const moneyPackages = [
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
    { amount: 200, label: '200 Million', price: 64 },
  ];

  type DeliveryTime = '24h' | '6h' | '1h';

  // Default to first package
  const [selectedPackage, setSelectedPackage] = useState(moneyPackages[0]);
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime>('24h');
  const [consoleType, setConsoleType] = useState('xbox-series');

  // Delivery multiplier (fixed additional costs)
  const deliveryCosts: Record<DeliveryTime, number> = {
    '24h': 0,
    '6h': 5,
    '1h': 10,
  };

  const totalPrice = (selectedPackage.price + deliveryCosts[deliveryTime]).toFixed(2);

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
            <Badge className="mb-4 bg-green-500/20 text-green-400">
              Xbox
            </Badge>
            <h1 className="font-impact text-5xl mb-6 text-white">
              GTA5 Money Boost - Xbox
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get millions in GTA5 cash instantly for Xbox. Safe, reliable, and
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
                <CardTitle className="font-impact text-2xl">Customize Your Xbox Order</CardTitle>
                <CardDescription>
                  Select your preferred amount and delivery time for Xbox.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Amount Select */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Money Amount: {selectedPackage.label} (${selectedPackage.price})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {moneyPackages.map(pkg => (
                      <Button
                        key={pkg.amount}
                        type="button"
                        variant={selectedPackage.amount === pkg.amount ? "default" : "outline"}
                        className={`px-4 py-2 text-sm ${selectedPackage.amount === pkg.amount ? "ring-2 ring-primary" : ""}`}
                        onClick={() => setSelectedPackage(pkg)}
                      >
                        {pkg.label} - ${pkg.price}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Console Select */}
                <div>
                  <label className="block text-sm font-medium mb-2">Xbox Console</label>
                  <Select value={consoleType} onValueChange={setConsoleType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Xbox console" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xbox-series">Xbox Series X|S</SelectItem>
                      <SelectItem value="xbox-one">Xbox One</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Delivery Time */}
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Time</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant={deliveryTime === '24h' ? "default" : "outline"}
                      className={`px-4 py-2 text-sm ${deliveryTime === '24h' ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setDeliveryTime('24h')}
                    >
                      Standard (24h-72h) $0
                    </Button>
                    <Button
                      type="button"
                      variant={deliveryTime === '6h' ? "default" : "outline"}
                      className={`px-4 py-2 text-sm ${deliveryTime === '6h' ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setDeliveryTime('6h')}
                    >
                      Express (12-24h) $5
                    </Button>
                    <Button
                      type="button"
                      variant={deliveryTime === '1h' ? "default" : "outline"}
                      className={`px-4 py-2 text-sm ${deliveryTime === '1h' ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setDeliveryTime('1h')}
                    >
                      Ultra Express (12h) $10
                    </Button>
                  </div>
                </div>

                {/* Price Display */}
                <div className="bg-background/50 p-4 rounded-lg border border-border/40">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Price:</span>
                    <span className="text-3xl font-bold text-primary">${totalPrice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Includes {selectedPackage.label} GTA5 cash for Xbox
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
                  <CardTitle className="font-impact text-xl">Xbox-Specific Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Xbox Live Gold Compatible</h4>
                      <p className="text-xs text-muted-foreground">Works with all Xbox Live Gold accounts</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Series X|S Optimized</h4>
                      <p className="text-xs text-muted-foreground">Full compatibility with next-gen consoles</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Account Safety</h4>
                      <p className="text-xs text-muted-foreground">Console-safe boosting methods</p>
                    </div>
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