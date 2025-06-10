'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How long does delivery take?',
    answer: 'Most orders are completed within 1-24 hours depending on the service and delivery option selected.'
  },
  {
    question: 'Is my account safe?',
    answer: 'Yes, we use advanced security measures and undetectable methods to ensure 100% account safety.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and various cryptocurrency options for secure payments.'
  },
  {
    question: 'Can I get a refund?',
    answer: 'Yes, we offer a money-back guarantee if we cannot complete your order as promised.'
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary">FAQ</Badge>
            <h1 className="font-impact text-5xl mb-6 text-glow">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to the most common questions about our services, delivery, safety, and payments.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-[#1C1C1C] border-border/40 card-glow">
                <CardHeader>
                  <CardTitle className="font-impact text-xl flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
