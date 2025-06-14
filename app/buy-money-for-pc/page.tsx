"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Zap,
  Clock,
  Star,
  DollarSign,
  CheckCircle,
} from "lucide-react";

export default function BuyMoneyForPcPage() {
  // Define money packages
  const moneyPackages = [
    { amount: 10, label: "10 Million", price: 8 },
    { amount: 15, label: "15 Million", price: 10 },
    { amount: 20, label: "20 Million", price: 12 },
    { amount: 25, label: "25 Million", price: 14 },
    { amount: 30, label: "30 Million", price: 16 },
    { amount: 40, label: "40 Million", price: 18 },
    { amount: 50, label: "50 Million", price: 20 },
    { amount: 60, label: "60 Million", price: 22 },
    { amount: 75, label: "75 Million", price: 25 },
    { amount: 100, label: "100 Million", price: 35 },
    { amount: 150, label: "150 Million", price: 52 },
    { amount: 200, label: "200 Million", price: 64 },
  ];

  // Define delivery time type
  type DeliveryTime = "standard" | "express" | "ultraExpress";

  // Default to first package
  const [selectedPackage, setSelectedPackage] = useState(moneyPackages[0]);
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime>("standard");

  // Delivery multiplier (now using fixed additional costs instead)
  const deliveryCosts: Record<DeliveryTime, number> = {
    standard: 0,
    express: 5,
    ultraExpress: 10,
  };

  const totalPrice = (
    selectedPackage.price + deliveryCosts[deliveryTime]
  ).toFixed(2);

  const benefits = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Complete within your selected timeframe",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Bank-level security for all transactions",
    },
    {
      icon: CheckCircle,
      title: "Safe Method",
      description: "Account-safe boosting techniques",
    },
    {
      icon: Star,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/moneyboostcover.jpeg')" }}
      >
        {/* Black Tint Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary">
              PC Platform
            </Badge>
            <h1 className="font-impact text-5xl mb-6 text-white">
              GTA5 Money Boost - PC
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get millions in GTA5 cash instantly for PC. Safe, reliable, and
              fast delivery with professional support. No account sharing
              required.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Customization Panel */}
            <Card className="bg-[#1C1C1C] border-border/40 card-glow">
              <CardHeader>
                <CardTitle className="font-impact text-2xl">
                  Customize Your Order
                </CardTitle>
                <CardDescription>
                  Select your preferred amount and delivery time to get started.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Amount Select */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Money Amount: {selectedPackage.label} ($
                    {selectedPackage.price})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {moneyPackages.map((pkg) => (
                      <Button
                        key={pkg.amount}
                        type="button"
                        variant={
                          selectedPackage.amount === pkg.amount
                            ? "default"
                            : "outline"
                        }
                        className={`px-4 py-2 text-sm ${
                          selectedPackage.amount === pkg.amount
                            ? "ring-2 ring-primary"
                            : ""
                        }`}
                        onClick={() => setSelectedPackage(pkg)}
                      >
                        {pkg.label} - ${pkg.price}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Platform (Fixed for PC) */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Platform
                  </label>
                  <Select value="pc" disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pc">
                        PC (Steam/Epic/Rockstar)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Delivery Time */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Delivery Time
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant={
                        deliveryTime === "standard" ? "default" : "outline"
                      }
                      className={`px-4 py-2 text-sm ${
                        deliveryTime === "standard" ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setDeliveryTime("standard")}
                    >
                      Standard (24h-72h) $0
                    </Button>
                    <Button
                      type="button"
                      variant={
                        deliveryTime === "express" ? "default" : "outline"
                      }
                      className={`px-4 py-2 text-sm ${
                        deliveryTime === "express" ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setDeliveryTime("express")}
                    >
                      Express (12-24h) $5
                    </Button>
                    <Button
                      type="button"
                      variant={
                        deliveryTime === "ultraExpress" ? "default" : "outline"
                      }
                      className={`px-4 py-2 text-sm ${
                        deliveryTime === "ultraExpress"
                          ? "ring-2 ring-primary"
                          : ""
                      }`}
                      onClick={() => setDeliveryTime("ultraExpress")}
                    >
                      Ultra Express (≤12h) $10
                    </Button>
                  </div>
                </div>

                {/* Price Display */}
                <div className="bg-background/50 p-4 rounded-lg border border-border/40">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Price:</span>
                    <span className="text-3xl font-bold text-primary">
                      ${totalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Includes {selectedPackage.label} GTA5 cash for PC
                  </p>
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-3"
                >
                  <DollarSign className="mr-2 h-5 w-5" />
                  Add to Cart - ${totalPrice}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Secure checkout with SSL encryption
                </p>
              </CardContent>
            </Card>

            {/* Benefits & Info */}
            <div className="space-y-6">
              {/* Benefits */}
              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl">
                    Why Choose Our Service?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm">{benefit.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Process */}
              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl">
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="text-lg mb-1">Complete Your Order</h4>
                      <p className="text-xs text-muted-foreground">
                        Customize and purchase your money boost package.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="text-lg mb-1">Provide Account Info</h4>
                      <p className="text-xs text-muted-foreground">
                        Securely share your account details through our
                        encrypted system.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="text-lg mb-1">Professional Boost</h4>
                      <p className="text-xs text-muted-foreground">
                        Our experts safely add the money to your account.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="text-lg mb-1">Enjoy GTA5</h4>
                      <p className="text-xs text-muted-foreground">
                        Log in and enjoy your enhanced GTA5 experience!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Info */}
              <Card className="bg-[#1C1C1C] border-border/40">
                <CardHeader>
                  <CardTitle className="font-impact text-xl flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-primary" />
                    Security & Safety
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>SSL encrypted checkout process</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Professional, undetectable methods</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Money-back guarantee</span>
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
