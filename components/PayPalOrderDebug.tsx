'use client';

import { useCart } from "@/hooks/useCart";
import { createPayPalOrderData, validatePayPalOrderData } from "@/lib/paypalUtils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

export default function PayPalOrderDebug() {
  const { cart } = useCart();
  const [showDetails, setShowDetails] = useState(false);

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  if (cart.items.length === 0) {
    return (
      <Card className="max-w-lg mx-auto mt-4 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
            PayPal Order Debug
          </CardTitle>
          <CardDescription>Cart is empty - add items to test PayPal integration</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const orderData = createPayPalOrderData(cart);
  const validation = validatePayPalOrderData(orderData);

  return (
    <Card className="max-w-2xl mx-auto mt-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          {validation.isValid ? (
            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 mr-2 text-red-500" />
          )}
          PayPal Order Debug
        </CardTitle>
        <CardDescription>
          Debug information for PayPal order creation
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Validation Status</h4>
            <Badge variant={validation.isValid ? "default" : "destructive"}>
              {validation.isValid ? "Valid" : "Invalid"}
            </Badge>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Total Amount</h4>
            <span className="text-lg font-bold">${orderData.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Items Total</h4>
            <span>${orderData.itemTotal.toFixed(2)}</span>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Item Count</h4>
            <span>{orderData.items.length}</span>
          </div>
        </div>

        {!validation.isValid && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Validation Errors:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              {validation.errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide' : 'Show'} Details
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              console.log('PayPal Order Data:', orderData);
              console.log('Validation:', validation);
            }}
          >
            Log to Console
          </Button>
        </div>

        {showDetails && (
          <div className="space-y-3">
            <div>
              <h4 className="font-medium mb-2">Breakdown</h4>
              <div className="text-sm space-y-1 bg-muted p-3 rounded">
                <div>Item Total: ${orderData.itemTotal.toFixed(2)}</div>
                <div>Tax: ${orderData.taxTotal.toFixed(2)}</div>
                <div>Shipping: ${orderData.shippingTotal.toFixed(2)}</div>
                <div>Handling: ${orderData.handlingTotal.toFixed(2)}</div>
                <div>Discount: ${orderData.discountTotal.toFixed(2)}</div>
                <div className="border-t pt-1 font-medium">
                  Total: ${orderData.total.toFixed(2)}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Items</h4>
              <div className="space-y-2">
                {orderData.items.map((item, index) => (
                  <div key={index} className="text-sm bg-muted p-2 rounded">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-muted-foreground">
                      ${item.unit_amount.value} × {item.quantity} = ${(parseFloat(item.unit_amount.value) * parseInt(item.quantity)).toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
