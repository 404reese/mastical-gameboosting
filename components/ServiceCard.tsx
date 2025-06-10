import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  platform: string;
  href: string;
  badge?: string;
}

export default function ServiceCard({ title, description, price, platform, href, badge }: ServiceCardProps) {
  return (
    <Card className="bg-[#1C1C1C] border-border/40 card-glow transition-all duration-300 hover:scale-105">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="font-impact text-lg">{title}</CardTitle>
          {badge && <Badge variant="secondary" className="bg-primary/20 text-primary">{badge}</Badge>}
        </div>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-2xl font-bold text-primary">{price}</p>
          </div>
          <Badge variant="outline">{platform}</Badge>
        </div>
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link href={href}>Shop Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
}