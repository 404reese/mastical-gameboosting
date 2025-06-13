import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ServicesPage() {
  const services = [
    {
      title: 'GTA5 Pure Cash - PC',
      description: 'Get millions in GTA5 cash instantly. Safe and reliable service with 24/7 support.',
      price: '$8',
      platform: 'PC',
      href: '/buy-money-for-pc',
      badge: 'Popular'
    },
    {
      title: 'GTA5 Pure Cash - Xbox',
      description: 'Xbox players can get instant cash boosts with secure delivery methods.',
      price: '$8',
      platform: 'Xbox',
      href: '/buy-money-for-xbox'
    },
    {
      title: 'GTA5 Pure Cash - PS',
      description: 'PlayStation money boost service with fast and secure delivery.',
      price: '$8',
      platform: 'PS',
      href: '/buy-money-for-ps5'
    },
    {
      title: 'GTA5 Car + Cash - Xbox',
      description: 'Boost your GTA5 experience with our car and cash boost service.',
      price: '$6',
      platform: 'All Platforms',
      href: '/buy-rank-boost',
      
    },
    {
      title: 'GTA5 Car + Cash - PS',
      description: 'Boost your GTA5 experience with our car and cash boost service.',
      price: '$24.99',
      platform: 'All Platforms',
      href: '/buy-unlock-all',
      badge: 'Hot'
    },
    {
      title: 'GTA5 Car + Cash - PC',
      description: 'Boost your GTA5 experience with our car and cash boost service.',
      price: '$6',
      platform: 'PC',
      href: '/buy-heist-completion'
    },
    {
      title: 'Rank Boosting',
      description: 'Level up your character fast with our professional boost service.',
      price: '$22.50',
      platform: 'All Platforms',
      href: '/buy-rank-boost',
      badge: 'Expert'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header Section */}
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-impact text-5xl mb-6 text-glow">
            GTA5 Boosting Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional GTA5 boosting services for all platforms. Choose from money boosts, rank ups, 
            item unlocks, and more. Fast, secure, and reliable with 24/7 customer support.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-background border-border/40">
              <CardHeader>
                <CardTitle className="font-impact text-2xl">Why Choose Our Services?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">100% Safe & Secure:</strong> We use advanced methods to ensure your account safety.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Fast Delivery:</strong> Most orders completed within 1-24 hours.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">24/7 Support:</strong> Our team is available around the clock to help you.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Money Back Guarantee:</strong> Full refund if we can't complete your order.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-border/40">
              <CardHeader>
                <CardTitle className="font-impact text-2xl">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">1</div>
                  <div>
                    <h4 className="mb-1">Select Your Service</h4>
                    <p className="text-sm text-muted-foreground">Choose the boosting service that fits your needs.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">Customize & Order</h4>
                    <p className="text-sm text-muted-foreground">Customize your order and proceed to secure checkout.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Provide Account Details</h4>
                    <p className="text-sm text-muted-foreground">Securely provide your account information for the boost.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-1">Enjoy Your Boost</h4>
                    <p className="text-sm text-muted-foreground">Relax while our professionals complete your boost safely.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}