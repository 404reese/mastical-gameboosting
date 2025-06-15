'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, CheckCircle, Trophy } from 'lucide-react';

export default function BuyRankBoostPage() {
  const [platform, setPlatform] = useState('pc');
  const [deliveryTime, setDeliveryTime] = useState<'standard' | 'express' | 'ultra' | null>('standard');
  const [selectedRank, setSelectedRank] = useState<100 | 200 | null>(null);

  const rankOptions = [
    { rank: 100, price: 22.5 },
    { rank: 200, price: 27.5 },
  ];

  const deliveryOptions = [
    { key: 'standard', label: 'Standard (24h-72h)', fee: 0 },
    { key: 'express', label: 'Express (12-24h)', fee: 5 },
    { key: 'ultra', label: 'Ultra Express (12h)', fee: 10 },
  ];

  const selectedOption = rankOptions.find(opt => opt.rank === selectedRank);
  const selectedDelivery = deliveryOptions.find(opt => opt.key === deliveryTime);
  const totalPrice = selectedOption
    ? (selectedOption.price + (selectedDelivery ? selectedDelivery.fee : 0)).toFixed(2)
    : '0.00';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section
        className="py-20 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/gtaimg.jpg')" }}
      >
        {/* Black Tint Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-400">All Platforms</Badge>
            <h1 className="font-impact text-5xl mb-6 text-white">
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
                  Choose Your Rank Boost
                </CardTitle>
                <CardDescription>
                  Select your desired rank boost package.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div>
                  <label className="block text-sm font-medium mb-2">Select Rank</label>
                  <div className="flex gap-4">
                    {rankOptions.map(option => (
                      <Button
                        key={option.rank}
                        variant={selectedRank === option.rank ? "default" : "outline"}
                        className={`flex-1 py-6 text-lg ${selectedRank === option.rank ? 'border-primary ring-2 ring-primary' : ''}`}
                        onClick={() => setSelectedRank(option.rank as 100 | 200)}
                      >
                        Rank {option.rank} (${option.price.toFixed(2)})
                      </Button>
                    ))}
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
                  <div className="flex gap-4">
                    {deliveryOptions.map(option => (
                      <Button
                        key={option.key}
                        variant={deliveryTime === option.key ? "default" : "outline"}
                        className={`flex-1 py-4 text-base ${deliveryTime === option.key ? 'border-primary ring-2 ring-primary' : ''}`}
                        onClick={() => setDeliveryTime(option.key as 'standard' | 'express' | 'ultra')}
                      >
                        {option.label} {option.fee > 0 ? `+$${option.fee}` : ''}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-background/50 p-4 rounded-lg border border-border/40">
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground">
                      {selectedRank ? `Selected Rank: ${selectedRank}` : 'Please select a rank'}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Price:</span>
                    <span className="text-3xl font-bold text-primary">
                      ${selectedRank ? totalPrice : '0.00'}
                    </span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-3"
                  disabled={!selectedRank}
                >
                  <DollarSign className="mr-2 h-5 w-5" />
                  {selectedRank ? `Order Rank Boost - $${totalPrice}` : 'Select Rank Option'}
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