'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'premiumgaming696@gmail.com',
      response: 'Response within 2 hours'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: '24/7 instant support',
      contact: 'Available on discord',
      response: 'Instant response'
    }
  ];

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary">Contact Us</Badge>
            <h1 className="font-impact text-5xl mb-6 text-glow">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about our services? Need help with an order? Our 24/7 support team 
              is here to assist you with anything you need.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-[#1C1C1C] border-border/40 text-center card-glow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-impact text-xl">{method.title}</CardTitle>
                  <CardDescription className="text-sm mb-2">{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-primary mb-1">{method.contact}</p>
                  <p className="text-xs text-muted-foreground">{method.response}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            {/* <Card className="bg-background border-border/40">
              <CardHeader>
                <CardTitle className="font-impact text-2xl flex items-center">
                  <Send className="mr-2 h-6 w-6 text-primary" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-[#1C1C1C] border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-[#1C1C1C] border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-[#1C1C1C] border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="What's this about?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Priority</label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#1C1C1C] border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 bg-[#1C1C1C] border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card> */}

            {/* Contact Info & FAQ */}
            <div className="space-y-8">
              
              {/* Business Hours */}
              <Card className="bg-background border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Support Team:</span>
                    <span className="text-primary font-semibold">24/7 Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Live Chat:</span>
                    <span className="text-primary font-semibold">Always Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone Support:</span>
                    <span className="text-primary font-semibold">24/7 Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email Response:</span>
                    <span className="text-primary font-semibold">Within 2 Hours</span>
                  </div>
                </CardContent>
              </Card>

              {/* Office Info */}
              <Card className="bg-background border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-primary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Email Support</p>
                      <p className="text-sm text-muted-foreground">premiumgaming696@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Phone Support</p>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Service Area</p>
                      <p className="text-sm text-muted-foreground">Worldwide Online Services</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick FAQ */}
              <Card className="bg-background border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl">Quick FAQ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-sm mb-1">{faq.question}</h4>
                      <p className="text-xs text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
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