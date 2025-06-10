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

export default function BuyMoneyForPs5Page() {
  const [amount, setAmount] = useState([10]);
  const [deliveryTime, setDeliveryTime] = useState('24h');
  const [psVersion, setPsVersion] = useState('ps5');
  const [region, setRegion] = useState('us');
  const [accountType, setAccountType] = useState('standard');
  
  const basePrice = 11.99;
  const amountMultiplier = amount[0] / 10;
  const deliveryMultiplier = deliveryTime === '1h' ? 2 : deliveryTime === '6h' ? 1.5 : 1;
  const regionMultiplier = region === 'eu' ? 1.1 : region === 'asia' ? 1.2 : 1;
  const accountMultiplier = accountType === 'premium' ? 1.3 : 1;
  const totalPrice = (basePrice * amountMultiplier * deliveryMultiplier * regionMultiplier * accountMultiplier).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-500/20 text-blue-400">PlayStation Platform</Badge>
            <h1 className="font-impact text-5xl mb-6 text-glow">
              GTA5 Money Boost - PlayStation
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional GTA5 money boost service for PlayStation 5 and PS4. 
              Fast, secure delivery with comprehensive customization options.
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

                <div>
                  <label className="block text-sm font-medium mb-2">Region</label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">North America (US/CA)</SelectItem>
                      <SelectItem value="eu">Europe (+10%)</SelectItem>
                      <SelectItem value="asia">Asia Pacific (+20%)</SelectItem>
                      <SelectItem value="other">Other Regions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Account Type</label>
                  <Select value={accountType} onValueChange={setAccountType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Account</SelectItem>
                      <SelectItem value="premium">Premium Account (+30%)</SelectItem>
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
                      <SelectItem value="48h">48 Hours (-10%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-background/50 p-4 rounded-lg border border-border/40">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Price:</span>
                    <span className="text-3xl font-bold text-primary">${totalPrice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Includes ${amount[0]}M GTA5 cash for PlayStation
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