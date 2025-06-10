'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Clock, Star, DollarSign, CheckCircle } from 'lucide-react';

export default function BuyMoneyForXboxPage() {
  const [amount, setAmount] = useState([10]);
  const [deliveryTime, setDeliveryTime] = useState('24h');
  
  const basePrice = 12.99;
  const amountMultiplier = amount[0] / 10;
  const deliveryMultiplier = deliveryTime === '1h' ? 2 : deliveryTime === '6h' ? 1.5 : 1;
  const totalPrice = (basePrice * amountMultiplier * deliveryMultiplier).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-500/20 text-green-400">Xbox Platform</Badge>
            <h1 className="font-impact text-5xl mb-6 text-glow">
              GTA5 Money Boost - Xbox
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional GTA5 money boost service for Xbox Series X|S and Xbox One. 
              Fast, secure delivery with 24/7 support.
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
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Money Amount: ${amount[0]} Million
                  </label>
                  <Slider
                    value={amount}
                    onValueChange={setAmount}
                    max={100}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$5M</span>
                    <span>$100M</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Xbox Console</label>
                  <Select defaultValue="xbox-series">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Xbox console" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xbox-series">Xbox Series X|S</SelectItem>
                      <SelectItem value="xbox-one">Xbox One</SelectItem>
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
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Price:</span>
                    <span className="text-3xl font-bold text-primary">${totalPrice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Includes ${amount[0]}M GTA5 cash for Xbox
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