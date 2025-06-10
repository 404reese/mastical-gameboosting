'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Unlock, DollarSign, CheckCircle, Star, Crown } from 'lucide-react';

export default function BuyUnlockAllPage() {
  const [platform, setPlatform] = useState('pc');
  const [deliveryTime, setDeliveryTime] = useState('48h');
  const [unlockOptions, setUnlockOptions] = useState({
    weapons: true,
    vehicles: true,
    properties: true,
    clothing: true,
    modifications: true,
    businesses: false,
    heistItems: false
  });
  
  const basePrices = {
    weapons: 5.99,
    vehicles: 8.99,
    properties: 6.99,
    clothing: 3.99,
    modifications: 4.99,
    businesses: 12.99,
    heistItems: 9.99
  };

  const platformMultiplier = platform === 'xbox' ? 1.2 : platform === 'ps5' ? 1.1 : 1;
  const deliveryMultiplier = deliveryTime === '24h' ? 1.5 : deliveryTime === '48h' ? 1 : 0.8;
  
  const selectedItems = Object.entries(unlockOptions).filter(([_, selected]) => selected);
  const subtotal = selectedItems.reduce((total, [item]) => total + basePrices[item as keyof typeof basePrices], 0);
  const totalPrice = (subtotal * platformMultiplier * deliveryMultiplier).toFixed(2);

  const handleOptionChange = (option: string, checked: boolean) => {
    setUnlockOptions(prev => ({
      ...prev,
      [option]: checked
    }));
  };

  const unlockCategories = [
    {
      id: 'weapons',
      title: 'All Weapons & Attachments',
      description: 'Unlock every weapon, modification, and attachment in GTA5',
      price: basePrices.weapons,
      items: ['Assault Rifles', 'Sniper Rifles', 'Heavy Weapons', 'All Attachments', 'Special Weapons']
    },
    {
      id: 'vehicles',
      title: 'All Vehicles',
      description: 'Access to every car, motorcycle, aircraft, and boat',
      price: basePrices.vehicles,
      items: ['Supercars', 'Motorcycles', 'Aircraft', 'Boats', 'Special Vehicles']
    },
    {
      id: 'properties',
      title: 'All Properties',
      description: 'Unlock apartments, garages, and special properties',
      price: basePrices.properties,
      items: ['High-End Apartments', 'Garages', 'Offices', 'Warehouses', 'Nightclubs']
    },
    {
      id: 'clothing',
      title: 'All Clothing & Accessories',
      description: 'Complete wardrobe with all outfits and accessories',
      price: basePrices.clothing,
      items: ['Designer Outfits', 'Accessories', 'Masks', 'Shoes', 'Special Items']
    },
    {
      id: 'modifications',
      title: 'All Vehicle Modifications',
      description: 'Every upgrade and customization option available',
      price: basePrices.modifications,
      items: ['Performance Upgrades', 'Visual Mods', 'Paint Jobs', 'Wheels', 'Interior']
    },
    {
      id: 'businesses',
      title: 'All Businesses (Premium)',
      description: 'Unlock and setup all business operations',
      price: basePrices.businesses,
      items: ['CEO Office', 'MC Businesses', 'Bunker', 'Facility', 'Arcade'],
      premium: true
    },
    {
      id: 'heistItems',
      title: 'All Heist Items (Premium)',
      description: 'Special items and rewards from all heists',
      price: basePrices.heistItems,
      items: ['Heist Vehicles', 'Special Outfits', 'Trophies', 'Decorations', 'Exclusive Items'],
      premium: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-400">Premium Service</Badge>
            <h1 className="font-impact text-5xl mb-6 text-glow">
              GTA5 Unlock All Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock everything in GTA5 with our comprehensive service. Choose exactly what you want 
              to unlock and get instant access to all premium content.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Unlock Options */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-2xl flex items-center">
                    <Unlock className="mr-2 h-6 w-6 text-primary" />
                    Select Items to Unlock
                  </CardTitle>
                  <CardDescription>
                    Choose which categories you want to unlock. Mix and match for a custom experience.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {unlockCategories.map((category) => (
                    <div key={category.id} className="border border-border/40 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={category.id}
                          checked={unlockOptions[category.id as keyof typeof unlockOptions]}
                          onCheckedChange={(checked) => handleOptionChange(category.id, checked as boolean)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <label htmlFor={category.id} className="font-semibold cursor-pointer flex items-center">
                              {category.title}
                              {category.premium && <Crown className="ml-2 h-4 w-4 text-yellow-400" />}
                            </label>
                            <span className="text-primary font-bold">${category.price}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {category.items.map((item, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="bg-[#1C1C1C] border-border/40 card-glow">
                <CardHeader>
                  <CardTitle className="font-impact text-xl">Order Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Platform</label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pc">PC (Steam/Epic/Rockstar)</SelectItem>
                        <SelectItem value="xbox">Xbox Series X|S / Xbox One (+20%)</SelectItem>
                        <SelectItem value="ps5">PlayStation 5 / PS4 (+10%)</SelectItem>
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
                        <SelectItem value="24h">24 Hours (+50%)</SelectItem>
                        <SelectItem value="48h">48 Hours (Standard)</SelectItem>
                        <SelectItem value="72h">72 Hours (-20%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-t border-border/40 pt-4">
                    <h4 className="font-semibold mb-2">Selected Items:</h4>
                    {selectedItems.length > 0 ? (
                      <div className="space-y-1">
                        {selectedItems.map(([item]) => {
                          const category = unlockCategories.find(cat => cat.id === item);
                          return (
                            <div key={item} className="flex justify-between text-sm">
                              <span>{category?.title}</span>
                              <span>${category?.price}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No items selected</p>
                    )}
                  </div>

                  <div className="bg-background/50 p-4 rounded-lg border border-border/40">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">Total Price:</span>
                      <span className="text-3xl font-bold text-primary">
                        ${selectedItems.length > 0 ? totalPrice : '0.00'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedItems.length} item(s) selected
                    </p>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-3"
                    disabled={selectedItems.length === 0}
                  >
                    <DollarSign className="mr-2 h-5 w-5" />
                    {selectedItems.length > 0 ? `Order Unlock Service - $${totalPrice}` : 'Select Items to Continue'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl flex items-center">
                    <Star className="mr-2 h-5 w-5 text-primary" />
                    Service Guarantees
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>100% account safety</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Permanent unlocks</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>No progress loss</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Money-back guarantee</span>
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