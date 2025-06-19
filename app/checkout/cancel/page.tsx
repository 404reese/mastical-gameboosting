'use client';

import { XCircle, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-[#1C1C1C] border-border/40">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <XCircle className="h-16 w-16 text-yellow-500" />
              </div>
              <CardTitle className="text-2xl font-impact text-glow">
                Payment Cancelled
              </CardTitle>
              <CardDescription className="text-lg">
                Your payment was cancelled and no charges were made
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-background/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">What happened?</h3>
                <p className="text-sm text-muted-foreground">
                  You cancelled the payment process. Your items are still in your cart 
                  and you can try again whenever you're ready.
                </p>
              </div>

              <div className="bg-background/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CreditCard className="h-5 w-5 mr-2 text-primary" />
                  <h4 className="font-semibold">Need Help?</h4>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Payment issues? Contact our support team</li>
                  <li>• Questions about services? Check our FAQ</li>
                  <li>• Your cart items are saved for 24 hours</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild className="flex-1">
                  <Link href="/buy/gta-5-boost">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/contact">
                    Contact Support
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
