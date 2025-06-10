'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Shield, DollarSign, CheckCircle, AlertTriangle, Clock, Users } from 'lucide-react';

export default function BuyAccountRecoveryPage() {
  const [platform, setPlatform] = useState('pc');
  const [banType, setBanType] = useState('temporary');
  const [banReason, setBanReason] = useState('');
  const [urgency, setUrgency] = useState('standard');
  const [accountDetails, setAccountDetails] = useState('');
  
  const basePrices = {
    temporary: 49.99,
    permanent: 89.99,
    shadowban: 69.99,
    suspension: 59.99
  };

  const platformMultiplier = platform === 'xbox' ? 1.3 : platform === 'ps5' ? 1.2 : 1;
  const urgencyMultiplier = urgency === 'urgent' ? 2 : urgency === 'priority' ? 1.5 : 1;
  const totalPrice = (basePrices[banType as keyof typeof basePrices] * platformMultiplier * urgencyMultiplier).toFixed(2);

  const banTypes = [
    {
      id: 'temporary',
      title: 'Temporary Ban',
      description: 'Account temporarily suspended (1-30 days)',
      price: basePrices.temporary,
      successRate: '95%',
      timeframe: '3-7 days'
    },
    {
      id: 'permanent',
      title: 'Permanent Ban',
      description: 'Account permanently banned from GTA Online',
      price: basePrices.permanent,
      successRate: '85%',
      timeframe: '7-14 days'
    },
    {
      id: 'shadowban',
      title: 'Shadow Ban',
      description: 'Account restricted to bad sport lobbies',
      price: basePrices.shadowban,
      successRate: '90%',
      timeframe: '5-10 days'
    },
    {
      id: 'suspension',
      title: 'Account Suspension',
      description: 'Account suspended with character reset',
      price: basePrices.suspension,
      successRate: '88%',
      timeframe: '5-12 days'
    }
  ];

  const recoverySteps = [
    {
      step: 1,
      title: 'Case Analysis',
      description: 'Our experts analyze your ban and determine the best recovery approach'
    },
    {
      step: 2,
      title: 'Documentation',
      description: 'We prepare all necessary documentation and evidence for your case'
    },
    {
      step: 3,
      title: 'Appeal Process',
      description: 'Professional appeal submission through proper channels'
    },
    {
      step: 4,
      title: 'Follow-up',
      description: 'Continuous monitoring and follow-up until resolution'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-red-500/20 text-red-400">Expert Recovery</Badge>
            <h1 className="font-impact text-5xl mb-6 text-glow">
              GTA5 Account Recovery Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional account recovery service for banned or suspended GTA5 accounts. 
              Our expert team has successfully recovered thousands of accounts.
            </p>
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-yellow-400">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold">Important: No guarantee of success. Payment only after successful recovery.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Recovery Form */}
            <Card className="bg-[#1C1C1C] border-border/40 card-glow">
              <CardHeader>
                <CardTitle className="font-impact text-2xl flex items-center">
                  <Shield className="mr-2 h-6 w-6 text-primary" />
                  Account Recovery Request
                </CardTitle>
                <CardDescription>
                  Provide details about your banned account for professional recovery assistance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div>
                  <label className="block text-sm font-medium mb-2">Platform</label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pc">PC (Steam/Epic/Rockstar)</SelectItem>
                      <SelectItem value="xbox">Xbox Series X|S / Xbox One (+30%)</SelectItem>
                      <SelectItem value="ps5">PlayStation 5 / PS4 (+20%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ban Type</label>
                  <Select value={banType} onValueChange={setBanType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ban type" />
                    </SelectTrigger>
                    <SelectContent>
                      {banTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.title} - ${type.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Recovery Priority</label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (7-14 days)</SelectItem>
                      <SelectItem value="priority">Priority (+50% - 3-7 days)</SelectItem>
                      <SelectItem value="urgent">Urgent (+100% - 1-3 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ban Reason (if known)</label>
                  <Select value={banReason} onValueChange={setBanReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ban reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modding">Modding/Cheating</SelectItem>
                      <SelectItem value="money">Money Glitch/Exploit</SelectItem>
                      <SelectItem value="griefing">Griefing/Harassment</SelectItem>
                      <SelectItem value="false">False Positive</SelectItem>
                      <SelectItem value="unknown">Unknown/Not Specified</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Account Details & Ban Information</label>
                  <Textarea
                    value={accountDetails}
                    onChange={(e) => setAccountDetails(e.target.value)}
                    placeholder="Please provide:
- Account username/email
- Date of ban
- Ban message received
- Account level and progress
- Any previous bans
- Additional relevant information"
                    rows={8}
                    className="bg-background/50 border-border/40"
                  />
                </div>

                <div className="bg-background/50 p-4 rounded-lg border border-border/40">
                  <div className="mb-2">
                    <h4 className="font-semibold">Selected Service:</h4>
                    <p className="text-sm text-muted-foreground">
                      {banTypes.find(type => type.id === banType)?.title} - {platform.toUpperCase()}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Price:</span>
                    <span className="text-3xl font-bold text-primary">${totalPrice}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Payment only required after successful recovery
                  </p>
                </div>

                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg py-3">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Submit Recovery Request - ${totalPrice}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  By submitting, you agree to our terms and recovery process
                </p>
              </CardContent>
            </Card>

            {/* Service Information */}
            <div className="space-y-6">
              
              {/* Ban Type Details */}
              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl">Recovery Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {banTypes.map((type) => (
                      <div 
                        key={type.id} 
                        className={`p-3 rounded-lg border ${
                          banType === type.id ? 'border-primary bg-primary/10' : 'border-border/40'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-sm">{type.title}</h4>
                          <span className="text-primary font-bold">${type.price}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{type.description}</p>
                        <div className="flex justify-between text-xs">
                          <span>Success Rate: <span className="text-green-400">{type.successRate}</span></span>
                          <span>Timeframe: <span className="text-blue-400">{type.timeframe}</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recovery Process */}
              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Recovery Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recoverySteps.map((step) => (
                    <div key={step.step} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Guarantees */}
              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Service Guarantees
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>No payment until successful recovery</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Professional legal approach</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Complete confidentiality</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>24/7 case updates</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Expert team with 5+ years experience</span>
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