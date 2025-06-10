'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Target, DollarSign, CheckCircle, Crown, Users } from 'lucide-react';

export default function BuyHeistCompletionPage() {
  const [platform, setPlatform] = useState('pc');
  const [deliveryTime, setDeliveryTime] = useState('48h');
  const [difficulty, setDifficulty] = useState('hard');
  const [selectedHeists, setSelectedHeists] = useState({
    fleeca: false,
    prisonBreak: false,
    humaneRaid: false,
    seriesA: false,
    pacificStandard: false,
    casinoHeist: false,
    cayoPerico: true,
    doomsday: false,
    allInOrder: false,
    criminalMastermind: false
  });
  
  const heistPrices = {
    fleeca: 8.99,
    prisonBreak: 12.99,
    humaneRaid: 14.99,
    seriesA: 13.99,
    pacificStandard: 16.99,
    casinoHeist: 19.99,
    cayoPerico: 22.99,
    doomsday: 24.99,
    allInOrder: 35.99,
    criminalMastermind: 49.99
  };

  const platformMultiplier = platform === 'xbox' ? 1.2 : platform === 'ps5' ? 1.1 : 1;
  const deliveryMultiplier = deliveryTime === '24h' ? 1.5 : deliveryTime === '48h' ? 1 : 0.8;
  const difficultyMultiplier = difficulty === 'hard' ? 1.3 : 1;
  
  const selectedItems = Object.entries(selectedHeists).filter(([_, selected]) => selected);
  const subtotal = selectedItems.reduce((total, [heist]) => total + heistPrices[heist as keyof typeof heistPrices], 0);
  const totalPrice = (subtotal * platformMultiplier * deliveryMultiplier * difficultyMultiplier).toFixed(2);

  const handleHeistChange = (heist: string, checked: boolean) => {
    setSelectedHeists(prev => ({
      ...prev,
      [heist]: checked
    }));
  };

  const heistCategories = [
    {
      id: 'fleeca',
      title: 'The Fleeca Job',
      description: 'Two-player heist targeting Fleeca Bank',
      price: heistPrices.fleeca,
      payout: '$143,750',
      players: '2 Players',
      difficulty: 'Easy'
    },
    {
      id: 'prisonBreak',
      title: 'Prison Break',
      description: 'Break Rashkovsky out of Bolingbroke Penitentiary',
      price: heistPrices.prisonBreak,
      payout: '$500,000',
      players: '4 Players',
      difficulty: 'Medium'
    },
    {
      id: 'humaneRaid',
      title: 'The Humane Labs Raid',
      description: 'Infiltrate Humane Labs and steal research data',
      price: heistPrices.humaneRaid,
      payout: '$675,000',
      players: '4 Players',
      difficulty: 'Medium'
    },
    {
      id: 'seriesA',
      title: 'Series A Funding',
      description: 'Help Trevor secure funding through drug deals',
      price: heistPrices.seriesA,
      payout: '$505,000',
      players: '4 Players',
      difficulty: 'Medium'
    },
    {
      id: 'pacificStandard',
      title: 'The Pacific Standard Job',
      description: 'Rob the Pacific Standard Public Deposit Bank',
      price: heistPrices.pacificStandard,
      payout: '$1,250,000',
      players: '4 Players',
      difficulty: 'Hard'
    },
    {
      id: 'casinoHeist',
      title: 'The Diamond Casino Heist',
      description: 'Infiltrate and rob the Diamond Casino & Resort',
      price: heistPrices.casinoHeist,
      payout: '$2,115,000',
      players: '2-4 Players',
      difficulty: 'Hard',
      popular: true
    },
    {
      id: 'cayoPerico',
      title: 'The Cayo Perico Heist',
      description: 'Solo heist on El Rubio\'s private island',
      price: heistPrices.cayoPerico,
      payout: '$1,900,000',
      players: '1-4 Players',
      difficulty: 'Hard',
      popular: true
    },
    {
      id: 'doomsday',
      title: 'The Doomsday Heist',
      description: 'Three-act heist to save the world',
      price: heistPrices.doomsday,
      payout: '$2,000,000',
      players: '2-4 Players',
      difficulty: 'Expert'
    },
    {
      id: 'allInOrder',
      title: 'All in Order Challenge',
      description: 'Complete all original heists in order',
      price: heistPrices.allInOrder,
      payout: '+$1,000,000 Bonus',
      players: '4 Players',
      difficulty: 'Expert',
      challenge: true
    },
    {
      id: 'criminalMastermind',
      title: 'Criminal Mastermind Challenge',
      description: 'Complete all heists without dying',
      price: heistPrices.criminalMastermind,
      payout: '+$10,000,000 Bonus',
      players: '4 Players',
      difficulty: 'Legendary',
      challenge: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-500/20 text-purple-400">Expert Service</Badge>
            <h1 className="font-impact text-5xl mb-6 text-glow">
              GTA5 Heist Completion Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional heist completion service with maximum payouts. Our expert team will complete 
              any heist with perfect execution and full rewards.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Heist Selection */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-2xl flex items-center">
                    <Target className="mr-2 h-6 w-6 text-primary" />
                    Select Heists to Complete
                  </CardTitle>
                  <CardDescription>
                    Choose which heists you want our team to complete for you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {heistCategories.map((heist) => (
                    <div key={heist.id} className="border border-border/40 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={heist.id}
                          checked={selectedHeists[heist.id as keyof typeof selectedHeists]}
                          onCheckedChange={(checked) => handleHeistChange(heist.id, checked as boolean)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <label htmlFor={heist.id} className="font-semibold cursor-pointer flex items-center">
                              {heist.title}
                              {heist.popular && <Badge className="ml-2 bg-primary/20 text-primary text-xs">Popular</Badge>}
                              {heist.challenge && <Crown className="ml-2 h-4 w-4 text-yellow-400" />}
                            </label>
                            <span className="text-primary font-bold">${heist.price}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{heist.description}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">
                              <Users className="mr-1 h-3 w-3" />
                              {heist.players}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Payout: {heist.payout}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                heist.difficulty === 'Easy' ? 'text-green-400' :
                                heist.difficulty === 'Medium' ? 'text-yellow-400' :
                                heist.difficulty === 'Hard' ? 'text-orange-400' :
                                heist.difficulty === 'Expert' ? 'text-red-400' :
                                'text-purple-400'
                              }`}
                            >
                              {heist.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Configuration */}
            <div className="space-y-6">
              <Card className="bg-[#1C1C1C] border-border/40 card-glow">
                <CardHeader>
                  <CardTitle className="font-impact text-xl">Heist Configuration</CardTitle>
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
                    <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal (Standard Payout)</SelectItem>
                        <SelectItem value="hard">Hard (+30% Payout)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Completion Time</label>
                    <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select completion time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">24 Hours (+50%)</SelectItem>
                        <SelectItem value="48h">48 Hours (Standard)</SelectItem>
                        <SelectItem value="72h">72 Hours (-20%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-t border-border/40 pt-4">
                    <h4 className="font-semibold mb-2">Selected Heists:</h4>
                    {selectedItems.length > 0 ? (
                      <div className="space-y-1">
                        {selectedItems.map(([heist]) => {
                          const heistData = heistCategories.find(h => h.id === heist);
                          return (
                            <div key={heist} className="flex justify-between text-sm">
                              <span>{heistData?.title}</span>
                              <span>${heistData?.price}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No heists selected</p>
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
                      {selectedItems.length} heist(s) selected
                    </p>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-3"
                    disabled={selectedItems.length === 0}
                  >
                    <DollarSign className="mr-2 h-5 w-5" />
                    {selectedItems.length > 0 ? `Order Heist Service - $${totalPrice}` : 'Select Heists to Continue'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl">Service Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Maximum payout guaranteed</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Professional team execution</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>All setups included</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Account safety guaranteed</span>
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