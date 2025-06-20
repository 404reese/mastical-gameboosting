import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Clock, Award, Target, Zap, CheckCircle, Star } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '50,000+' },
    { icon: Clock, label: 'Years Experience', value: '5+' },
    { icon: CheckCircle, label: 'Success Rate', value: '99.9%' },
    { icon: Award, label: 'Services Completed', value: '100,000+' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize account safety with advanced security measures and undetectable methods.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Quick delivery times without compromising quality or safety standards.'
    },
    {
      icon: Target,
      title: 'Precision Service',
      description: 'Exact delivery of what you order with attention to every detail.'
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Professional-grade services that exceed expectations every time.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary">About Us</Badge>
            <h1 className="font-impact text-5xl mb-6">
              Leading GTA5 Boosting Experts
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are the premier GTA5 boosting service provider, trusted by over 50,000 players worldwide. 
              Our mission is to enhance your gaming experience with safe, fast, and reliable services.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-[#1C1C1C] border-border/40 text-center card-glow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-impact text-3xl text-primary">{stat.value}</CardTitle>
                  <CardDescription className="text-base">{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Our Story */}
      {/* <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-impact text-4xl mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2019 by passionate GTA5 players, we started as a small team helping friends 
                  level up their gaming experience. What began as a hobby quickly grew into the most 
                  trusted boosting service in the community.
                </p>
                <p>
                  Today, we're proud to serve over 50,000 satisfied customers across all platforms. 
                  Our team of expert gamers and security specialists work around the clock to provide 
                  safe, fast, and reliable boosting services.
                </p>
                <p>
                  We believe gaming should be fun, not frustrating. That's why we're committed to 
                  helping players unlock their full potential in GTA5 with professional-grade services 
                  that prioritize account safety above all else.
                </p>
              </div>
            </div>
            <Card className="bg-background border-border/40">
              <CardHeader>
                <CardTitle className="font-impact text-2xl">Why Players Choose Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>100% account safety guarantee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>24/7 customer support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Fast delivery times</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Money-back guarantee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Professional team of experts</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-impact text-4xl mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and ensure the best experience for our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-[#1C1C1C] border-border/40 text-center card-glow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-impact text-xl">{value.title}</CardTitle>
                  <CardDescription className="text-sm">{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-impact text-4xl mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our dedicated professionals work 24/7 to provide you with the best gaming experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background border-border/40 text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-impact text-xl">Boost Specialists</CardTitle>
                <CardDescription>
                  Expert gamers with years of GTA5 experience who handle all boosting services safely and efficiently.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-background border-border/40 text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-impact text-xl">Security Team</CardTitle>
                <CardDescription>
                  Cybersecurity experts who ensure all our methods are undetectable and your account stays safe.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-background border-border/40 text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-impact text-xl">Support Team</CardTitle>
                <CardDescription>
                  24/7 customer support specialists ready to help you with any questions or concerns.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}