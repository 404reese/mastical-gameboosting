'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CheckCircle, CreditCard } from 'lucide-react';

// Price options as button choices
const priceOptions = [
  { label: '10 million', value: 10, price: 6 },
  { label: '15 million', value: 15, price: 7 },
  { label: '20 million', value: 20, price: 8 },
  { label: '25 million', value: 25, price: 9 },
  { label: '30 million', value: 30, price: 10 },
  { label: '40 million', value: 40, price: 12 },
  { label: '50 million', value: 50, price: 13 },
  { label: '60 million', value: 60, price: 14 },
  { label: '75 million', value: 75, price: 16 },
  { label: '100 million', value: 100, price: 18 },
  { label: '150 million', value: 150, price: 23 },
  { label: '200 million', value: 200, price: 28 },
  { label: '250 million', value: 250, price: 33 },
  { label: '300 million', value: 300, price: 38 },
  { label: '500 million', value: 500, price: 45 },
  { label: '600 million', value: 600, price: 50 },
  { label: '700 million', value: 700, price: 55 },
  { label: '800 million', value: 800, price: 60 },
  { label: '900 million', value: 900, price: 65 },
  { label: '1000 million', value: 1000, price: 70 },
];

// Delivery options as button choices
const deliveryOptions = [
  { label: 'Standard (24h-72h)', value: 'standard', price: 0 },
  { label: 'Express (12-24h)', value: 'express', price: 5 },
  { label: 'Ultra Express (12h)', value: 'ultra', price: 10 },
];

export default function BuyCarCashForPcPage() {
  const [selectedPrice, setSelectedPrice] = useState(priceOptions[0].value);
  const [deliveryType, setDeliveryType] = useState('standard');

  const selectedPriceOption = priceOptions.find(opt => opt.value === selectedPrice)!;
  const selectedDelivery = deliveryOptions.find(opt => opt.value === deliveryType)!;
  const totalPrice = (selectedPriceOption.price + selectedDelivery.price).toFixed(2);

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
            <Badge className="mb-4 bg-green-600/20 text-green-400">
              Xbox Platform
            </Badge>
            <h1 className="font-impact text-5xl mb-6 text-white">
              GTA5 Car + Cash - Xbox
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               Get a premium car and instant cash boost for GTA5 Xbox. Fast, safe, and reliable delivery with multiple package options.
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
                  Select Cash Amount
                </CardTitle>
                <CardDescription>
                  Choose your GTA5 cash amount for Xbox.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">

                <div>
                  <label className="block text-sm font-medium mb-2">Cash Amount</label>
                  <div className="flex gap-2 flex-wrap">
                    {priceOptions.map(option => (
                      <Button
                        key={option.value}
                        type="button"
                        variant={selectedPrice === option.value ? "default" : "outline"}
                        className={`px-3 py-2 text-xs ${selectedPrice === option.value ? 'border-primary border-2' : ''}`}
                        onClick={() => setSelectedPrice(option.value)}
                      >
                        {option.label} <span className="ml-1 font-semibold">${option.price}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Delivery</label>
                  <div className="flex gap-3 flex-wrap">
                    {deliveryOptions.map(option => (
                      <Button
                        key={option.value}
                        type="button"
                        variant={deliveryType === option.value ? "default" : "outline"}
                        className={`px-4 py-2 ${deliveryType === option.value ? 'border-primary border-2' : ''}`}
                        onClick={() => setDeliveryType(option.value)}
                      >
                        {option.label}
                        {option.price > 0 && (
                          <span className="ml-2 font-semibold">+${option.price}</span>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-background/50 p-4 rounded-lg border border-border/40">
                  <div className="mb-2">
                    <h3 className="font-semibold">{selectedPriceOption.label} Cash</h3>
                    <p className="text-sm text-muted-foreground">
                      GTA5 Online cash boost for Xbox
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Price:</span>
                    <span className="text-3xl font-bold text-primary">${totalPrice}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Delivery: {selectedDelivery.label}
                  </div>
                </div>

                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg py-3">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Purchase Cash - ${totalPrice}
                </Button>
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
                      <h4 className="font-semibold text-sm">Instant Delivery</h4>
                      <p className="text-xs text-muted-foreground">
                        Car and cash added directly to your GTA Online account
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Premium Cars</h4>
                      <p className="text-xs text-muted-foreground">
                        Receive high-value, fully upgraded cars
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Safe & Secure</h4>
                      <p className="text-xs text-muted-foreground">
                        100% safe delivery methods, no bans or risks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Full Support</h4>
                      <p className="text-xs text-muted-foreground">
                        24/7 customer support for all orders
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
                  <div className="text-sm">• Instantly own rare and expensive cars</div>
                  <div className="text-sm">• Boost your GTA5 cash balance for any purchase</div>
                  <div className="text-sm">• Upgrade your garage with premium vehicles</div>
                  <div className="text-sm">• Access more content and enjoy the game</div>
                  <div className="text-sm">• Stand out with exclusive car selections</div>
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
