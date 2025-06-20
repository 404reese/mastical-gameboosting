import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { ArrowRight, Shield, Zap, Clock, DollarSign, Users, Star } from 'lucide-react';
import { AiOutlineDiscord } from "react-icons/ai";


export default function Home() {
  const featuredServices = [
    {
      title: 'GTA5 Money Boost - PC',
      description: 'Get millions in GTA5 cash instantly. Safe and reliable service.',
      price: '$9.99',
      platform: 'PC',
      href: '/buy-money-for-pc',
      badge: 'Popular'
    },
    {
      title: 'GTA5 Money Boost - Xbox',
      description: 'Xbox players can get instant cash boosts with 24/7 support.',
      price: '$12.99',
      platform: 'Xbox',
      href: '/buy-money-for-xbox'
    },
    {
      title: 'GTA5 Credits - PC',
      description: 'Purchase Shark Cards and credits for all your GTA5 needs.',
      price: '$7.99',
      platform: 'PC',
      href: '/buy-credits-for-pc'
    },
    {
      title: 'Rank Boost Service',
      description: 'Level up your character fast with our professional boost service.',
      price: '$15.99',
      platform: 'All Platforms',
      href: '/buy-rank-boost',
      badge: 'New'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/60 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/heroimg.jpg')`
          }}
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-impact text-5xl md:text-7xl mb-6">
            Level Up Your GTA5 Experience
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional boosting services for GTA5. Fast, secure, and affordable. Get the money, ranks, and items you need.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-3">
            <Link href="/buy/gta-5-boost" className="flex items-center">
              Buy Boosting Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-impact text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting your GTA5 boost is simple and straightforward
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="bg-background border-border/40 text-center card-glow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-impact text-xl">1. Select Service</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Choose from our wide range of GTA5 boosting services including money, ranks, and items.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-background border-border/40 text-center card-glow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>2. Customize Order</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Customize your order with platform, amount, and delivery preferences that suit your needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background border-border/40 text-center card-glow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AiOutlineDiscord  className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-impact text-xl">3. Join Discord for Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Join our Discord server for support, updates, and community interactions.
                </CardDescription>
                {/* <Button size="sm" className="bg-primary hover:bg-primary/90 text-base px-8 py-3 mt-4">
                  <Link href="https://discord.gg/gamingboosters" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Join Discord <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button> */}
              </CardContent>
            </Card>
            
            <Card className="bg-background border-border/40 text-center card-glow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-impact text-xl">4. Enjoy GTA5</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Sit back and enjoy your enhanced GTA5 experience with fast and secure delivery.
                </CardDescription>
              </CardContent>
            </Card>
            
            
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-impact text-4xl mb-4">Featured Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our most popular GTA5 boosting services trusted by thousands of players
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/buy/gta-5-boost">
                View All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* Trust Section */}
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-impact text-xl mb-2">100% Secure</h3>
              <p className="text-muted-foreground">
                All transactions are protected with bank-level security and encryption.
              </p>
            </div>
            <div>
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-impact text-xl mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Most orders are completed within 1-24 hours with 24/7 support.
              </p>
            </div>
            <div>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-impact text-xl mb-2">Trusted by 50K+</h3>
              <p className="text-muted-foreground">
                Over 50,000 satisfied customers trust our professional services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}