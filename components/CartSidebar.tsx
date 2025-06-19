'use client';

import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';

interface CartSidebarProps {
  children: React.ReactNode;
}

export default function CartSidebar({ children }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] bg-[#1C1C1C] border-border/40">
        <SheetHeader>
          <SheetTitle className="flex items-center text-xl font-impact text-glow">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart ({cart.totalItems})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cart.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">Start shopping to add items to your cart</p>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link href="/buy/gta-5-boost">Browse Services</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="border border-border/40 rounded-lg p-4 bg-background/50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.service}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {item.platform}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {item.deliverySpeed}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">
                            {formatPrice((item.price + item.deliveryCost) * item.quantity)}
                          </div>
                          {item.deliveryCost > 0 && (
                            <div className="text-xs text-muted-foreground">
                              +{formatPrice(item.deliveryCost)} delivery
                            </div>
                          )}
                        </div>
                      </div>

                      {item.amount && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Amount: {item.amount} Million
                        </div>
                      )}
                    </div>
                  ))}
                </div>              </div>

              <div className="border-t border-border/40 pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(cart.totalPrice)}
                  </span>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
