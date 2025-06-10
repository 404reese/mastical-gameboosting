'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, CheckCircle, Trophy } from 'lucide-react';

export default function BuyRankBoostPage() {
  const [currentLevel, setCurrentLevel] = useState([1]);
  const [targetLevel, setTargetLevel] = useState([50]);
  const [platform, setPlatform] = useState('pc');
  const [deliveryTime, setDeliveryTime] = useState('48h');
  
  const levelDifference = Math.max(0, targetLevel[0] - currentLevel[0]);
  const basePrice = 0.99;
  const levelPrice = levelDifference * basePrice;
  const platformMultiplier = platform === 'xbox' ? 1.2 : platform === 'ps5' ? 1.1 : 1;
  const deliveryMultiplier = deliveryTime === '24h' ? 1.5 : deliveryTime === '48h' ? 1 : 0.8;
  const totalPrice = (levelPrice * platformMultiplier * deliveryMultiplier).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-400">All Platforms</Badge>
            <h1 className="font-impact text-5xl mb-6 text-glow">
              GTA5 Rank Boost Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional rank boosting service for GTA5. Level up your character fast 
              with our expert team. Available for PC, Xbox, and PlayStation.
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
                  <TrendingUp className="mr-2 h-6 w-6 text-primary" />
                  Customize Your Rank Boost
                </CardTitle>
                <CardDescription>
                  Set your current level and target level to calculate pricing.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Current Level: {currentLevel[0]}
                  </label>
                  <Slider
                    value={currentLevel}
                    onValueChange={setCurrentLevel}
                    max={999}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Level 1</span>
                    <span>Level 999</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Target Level: {targetLevel[0]}
                  </label>
                  <Slider
                    value={targetLevel}
                    onValueChange={setTargetLevel}
                    max={999}
                    min={currentLevel[0] + 1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Level {currentLevel[0] + 1}</span>
                    <span>Level 999</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Platform</label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pc">PC (Steam/Epic/Rockstar)</SelectItem>
                      <SelectItem value="xbox">Xbox Series X|S / Xbox One</SelectItem>
                      <SelectItem value="ps5">PlayStation 5 / PS4</SelectItem>
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

                <div className="bg-background/50 p-4 rounded-lg border border-border/40">
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground">
                      Level {currentLevel[0]} → Level {targetLevel[0]} ({levelDifference} levels)
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Price:</span>
                    <span className="text-3xl font-bold text-primary">
                      ${levelDifference > 0 ? totalPrice : '0.00'}
                    </span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-3"
                  disabled={levelDifference <= 0}
                >
                  <DollarSign className="mr-2 h-5 w-5" />
                  {levelDifference > 0 ? `Order Rank Boost - $${totalPrice}` : 'Select Target Level'}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-primary" />
                    Rank Boost Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Unlock All Content</h4>
                      <p className="text-xs text-muted-foreground">
                        Access level-restricted weapons, vehicles, and activities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Increased Stats</h4>
                      <p className="text-xs text-muted-foreground">
                        Higher health, better weapon handling, and improved abilities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Respect & Prestige</h4>
                      <p className="text-xs text-muted-foreground">
                        Show off your high level to other players online
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Job Access</h4>
                      <p className="text-xs text-muted-foreground">
                        Participate in high-level missions and heists
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl">Level Milestones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Level 12</span>
                    <span className="text-muted-foreground">Heists unlock</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Level 25</span>
                    <span className="text-muted-foreground">Armored vehicles</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Level 40</span>
                    <span className="text-muted-foreground">CEO/VIP abilities</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Level 100</span>
                    <span className="text-muted-foreground">All weapons & mods</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Level 200+</span>
                    <span className="text-muted-foreground">Maximum stats</span>
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