'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';

export default function PayPalDiagnostic() {
  const [showClientId, setShowClientId] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  
  const copyToClipboard = async () => {
    if (clientId) {
      await navigator.clipboard.writeText(clientId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isValidFormat = (id: string) => {
    return /^[A-Za-z0-9_-]+$/.test(id) && id.length >= 10;
  };

  const getClientIdMasked = (id: string) => {
    if (id.length <= 10) return id;
    return id.substring(0, 8) + '*'.repeat(Math.min(id.length - 16, 20)) + id.substring(id.length - 8);
  };

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <Card className="max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle className="text-lg">PayPal Diagnostic</CardTitle>
        <CardDescription>Debug PayPal Client ID configuration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Client ID Status:</span>
            <span className={`text-sm ${clientId ? 'text-green-600' : 'text-red-600'}`}>
              {clientId ? '✓ Found' : '✗ Missing'}
            </span>
          </div>
          
          {clientId && (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Format Valid:</span>
                <span className={`text-sm ${isValidFormat(clientId) ? 'text-green-600' : 'text-red-600'}`}>
                  {isValidFormat(clientId) ? '✓ Valid' : '✗ Invalid'}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Length:</span>
                <span className="text-sm">{clientId.length} characters</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Client ID:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowClientId(!showClientId)}
                    >
                      {showClientId ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="p-2 bg-muted rounded text-xs font-mono break-all">
                  {showClientId ? clientId : getClientIdMasked(clientId)}
                </div>
              </div>
            </>
          )}
          
          {!clientId && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                PayPal Client ID not found. Please add it to your .env.local file:
              </p>
              <code className="block mt-2 text-xs bg-red-100 p-2 rounded">
                NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_actual_client_id_here
              </code>
            </div>
          )}
          
          {clientId && !isValidFormat(clientId) && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Client ID format appears invalid. It should contain only letters, numbers, hyphens, and underscores.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
