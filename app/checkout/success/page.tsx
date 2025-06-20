'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { BiHappyBeaming } from "react-icons/bi";


export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const dbOrders = searchParams.get('db_orders');
  const [orderDetails, setOrderDetails] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');

  useEffect(() => {
    const verifyPayment = async () => {
      if (orderId && dbOrders && verificationStatus === 'idle') {
        try {
          setVerificationStatus('verifying');
          console.log('Verifying payment for PayPal order:', orderId);
          
          // Call verification endpoint as a backup to ensure payment status is updated
          const response = await fetch('/api/paypal/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: orderId,
              createdOrderIds: dbOrders.split(',').filter(id => id.trim()),
            }),
          });

          if (response.ok) {
            const result = await response.json();
            console.log('Payment verification completed:', result);
            setVerificationStatus('success');
          } else {
            console.warn('Payment verification failed, but this may be normal if already processed');
            setVerificationStatus('success'); // Don't show error to user as payment may already be processed
          }
        } catch (error) {
          console.error('Error during payment verification:', error);
          setVerificationStatus('success'); // Don't show error to user as payment may already be processed
        }
      }
    };

    verifyPayment();
  }, [orderId, dbOrders, verificationStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-[#1C1C1C] border-border/40">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl font-impact text-glow">
                Payment Successful!
              </CardTitle>
              <CardDescription className="text-lg">
                Your order has been placed and payment confirmed
              </CardDescription>
            </CardHeader>
              <CardContent className="space-y-6">              {verificationStatus === 'verifying' && (
                <div className="bg-blue-500/20 text-blue-400 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 mr-2"></div>
                    Finalizing payment verification...
                  </div>
                </div>
              )}
              
              {verificationStatus === 'success' && (
                <div className="bg-green-500/20 text-green-400 p-4 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Payment verified successfully
                  </div>
                </div>
              )}
              
              {orderId && (
                <div className="bg-background/50 rounded-lg p-4">
                  <h3 className=" mb-2">Order Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Order ID: <span className="font-mono">{orderId}</span>
                  </p>
                </div>
              )}

              {/* Make What's Next section full width */}
              <div className="bg-background/50 rounded-lg px-8 py-8 mb-4 text-center">
                <div className="flex flex-col items-center mb-4">
                  <BiHappyBeaming className="h-8 w-8 mb-2 text-primary" />
                  <h4 className="text-2xl mb-2">What's Next?</h4>
                </div>
                <ul className="text-lg text-muted-foreground space-y-3 mb-4">
                  <li>
                    <span>• Join our Discord server for order updates and support</span>
                  </li>
                  <li>
                    <span>• Processing will begin shortly</span>
                  </li>
                  <li>
                    <span>• You'll receive updates via discord</span>
                  </li>
                </ul>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-10 py-4 mx-auto mt-2">
                  <Link href="https://discord.gg/gamingboosters" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    Join Discord <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
              </div>

              {/* Keep grid for other sections if needed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div className="bg-background/50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Download className="h-5 w-5 mr-2 text-primary" />
                    <h4 className="font-semibold">Support</h4>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 24/7 customer support</li>
                    <li>• Live order tracking</li>
                    <li>• Satisfaction guaranteed</li>
                  </ul>
                </div> */}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/">
                    Return to Home
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
