'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, RefreshCw, Loader2, Mail, User, CreditCard, Clock, Shield } from 'lucide-react';
import Link from 'next/link';
import { OrderService } from '@/lib/orderService';
import { Order } from '@/types/order';
import { toast } from 'sonner';

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);  // Form states for updating order
  const [orderStatus, setOrderStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadOrder();
    } else {
      router.push('/admin');
    }
  }, [router, orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await OrderService.getOrderById(orderId);
      
      if (error) {
        setError('Failed to load order details');
        console.error('Error loading order:', error);      } else if (data) {
        setOrder(data);
        setOrderStatus(data.order_status);
        setPaymentStatus(data.payment_status);
        setAdminNotes(data.admin_notes || '');
      } else {
        setError('Order not found');
      }
    } catch (err) {
      setError('Failed to load order details');
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    if (!order) return;
    
    try {
      setSaving(true);
        // Update order status
      if (orderStatus !== order.order_status) {
        const { error } = await OrderService.updateOrderStatus(orderId, orderStatus as any);
        if (error) {
          toast.error('Failed to update order status');
          return;
        }
      }
      
      // Update payment status
      if (paymentStatus !== order.payment_status) {
        const { error } = await OrderService.updatePaymentStatus(orderId, paymentStatus as any);
        if (error) {
          toast.error('Failed to update payment status');
          return;
        }
      }
      
      // Update admin notes
      if (adminNotes !== (order.admin_notes || '')) {
        const { error } = await OrderService.updateOrder(orderId, { admin_notes: adminNotes });
        if (error) {
          toast.error('Failed to update admin notes');
          return;
        }
      }
      
      toast.success('Order updated successfully');
      loadOrder(); // Reload to get updated data
      
    } catch (err) {
      toast.error('Failed to update order');
      console.error('Update error:', err);
    } finally {
      setSaving(false);
    }
  };

  // Helper functions for status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'Processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
      case 'In Progress': return 'bg-purple-500/20 text-purple-400 border-purple-500/20';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
      case 'Cancelled': return 'bg-red-500/20 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/20';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
      case 'Failed': return 'bg-red-500/20 text-red-400 border-red-500/20';
      case 'Refunded': return 'bg-orange-500/20 text-orange-400 border-orange-500/20';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/20';
    }
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading order details...</span>
        </div>
      </AdminLayout>
    );
  }

  if (error || !order) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/orders">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
              </Link>
            </Button>
            <h1 className="font-impact text-3xl font-bold text-glow">Order Details</h1>
          </div>
          
          <Card className="bg-[#1C1C1C] border-border/40">
            <CardContent className="py-20 text-center">
              <p className="text-red-400 text-lg">{error}</p>
              <Button variant="outline" className="mt-4" onClick={loadOrder}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    
      <div className="space-y-6 p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/orders">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
              </Link>
            </Button>
            <div>
              <h1 className="font-impact text-3xl font-bold text-glow">Order Details</h1>
              <p className="text-muted-foreground">Order ID: {order.order_id}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={loadOrder}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">          {/* Customer Information */}
          <Card className="bg-[#1C1C1C] border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Database ID</Label>
                  <p className="text-sm text-muted-foreground font-mono">{order.id?.toString()}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Order ID</Label>
                  <p className="text-sm font-mono">{order.order_id}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Customer Name</Label>
                <p className="text-lg font-semibold">{order.customer_name}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Customer Email</Label>
                <p className="text-muted-foreground">{order.customer_email || 'Not provided'}</p>
              </div>
              
              {order.customer_notes && (
                <div>
                  <Label className="text-sm font-medium">Customer Notes</Label>
                  <p className="text-muted-foreground bg-background/50 p-3 rounded-lg text-sm">
                    {order.customer_notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>          {/* Order Information */}
          <Card className="bg-[#1C1C1C] border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Order Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Service</Label>
                <p className="text-lg">{order.service}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Platform</Label>
                  <Badge variant="outline" className="mt-1">
                    {order.platform || 'Not specified'}
                  </Badge>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Service Type</Label>
                  <Badge variant="secondary" className="mt-1">
                    {order.service_type || 'General'}
                  </Badge>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Delivery Speed</Label>
                  <Badge variant="outline" className="mt-1">
                    {order.delivery_speed}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Amount (USD)</Label>
                  <p className="text-2xl font-bold text-primary">${order.amount}</p>
                </div>
                
                {order.gta_account_credits && (
                  <div>
                    <Label className="text-sm font-medium">GTA Account Credits</Label>
                    <p className="text-xl font-bold text-green-400">{order.gta_account_credits}M</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>          {/* Status Management */}
          <Card className="bg-[#1C1C1C] border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Status Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">              <div>
                <Label htmlFor="orderStatus">Order Status</Label>
                <Select value={orderStatus} onValueChange={setOrderStatus}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-2">
                  <Badge className={getStatusColor(orderStatus)}>
                    Current: {orderStatus}
                  </Badge>
                </div>
              </div>              <div>
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                    <SelectItem value="Refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-2">
                  <Badge className={getPaymentStatusColor(paymentStatus)}>
                    Current: {paymentStatus}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GTA Account Information */}
          <Card className="bg-[#1C1C1C] border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                GTA Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.gta_account_email ? (
                <>
                  <div>
                    <Label className="text-sm font-medium">GTA Account Email</Label>
                    <p className="text-blue-400 font-mono text-sm bg-background/50 p-2 rounded">
                      {order.gta_account_email}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">GTA Account Password</Label>
                    <p className="text-green-400 font-mono text-sm bg-background/50 p-2 rounded">
                      {order.gta_account_password || 'Not provided'}
                    </p>
                  </div>
                  
                  {order.gta_account_credits && (
                    <div>
                      <Label className="text-sm font-medium">Account Credits</Label>
                      <p className="text-xl font-bold text-green-400">
                        {order.gta_account_credits} Million GTA$
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No GTA account information provided
                </p>
              )}
            </CardContent>
          </Card>          {/* Timeline & Admin Notes */}
          <Card className="bg-[#1C1C1C] border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Timeline & Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-background/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Order Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Created:</span>
                      <span className="font-mono">{new Date(order.created_at).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span className="font-mono">{new Date(order.updated_at).toLocaleString()}</span>
                    </div>
                    
                    {order.estimated_completion && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Est. Completion:</span>
                        <span className="font-mono text-blue-400">{new Date(order.estimated_completion).toLocaleString()}</span>
                      </div>
                    )}
                    
                    {order.completed_at && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Completed:</span>
                        <span className="font-mono text-green-400">{new Date(order.completed_at).toLocaleString()}</span>
                      </div>
                    )}
                    
                    {!order.estimated_completion && !order.completed_at && (
                      <div className="text-sm text-muted-foreground">
                        No completion dates set
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="adminNotes">Admin Notes</Label>
                <Textarea
                  id="adminNotes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add internal notes about this order..."
                  rows={4}
                  className="mt-1"
                />
                {order.admin_notes && order.admin_notes !== adminNotes && (
                  <p className="text-xs text-yellow-400 mt-1">
                    ⚠️ You have unsaved changes
                  </p>
                )}
              </div>
            </CardContent>
          </Card>          {/* Service Details & Raw Data */}
          <Card className="bg-[#1C1C1C] border-border/40 lg:col-span-2 xl:col-span-3">
            <CardHeader>
              <CardTitle>Complete Order Data</CardTitle>
              <CardDescription>
                Full technical details and service information for this order
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Formatted Service Details */}
              {order.service_details && (
                <div>
                  <h4 className="font-semibold mb-3">Service Details</h4>
                  <div className="bg-background/50 p-4 rounded-lg">
                    {typeof order.service_details === 'object' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(order.service_details).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <Label className="text-xs font-medium text-muted-foreground">
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </Label>
                            <p className="text-sm">
                              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">{String(order.service_details)}</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Complete Database Record */}
              <div>
                <h4 className="font-semibold mb-3">Complete Database Record</h4>
                <div className="bg-background/50 p-4 rounded-lg overflow-auto">
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                    {JSON.stringify({
                      id: order.id,
                      order_id: order.order_id,
                      customer_name: order.customer_name,
                      customer_email: order.customer_email,
                      delivery_speed: order.delivery_speed,
                      service: order.service,
                      amount: order.amount,
                      payment_status: order.payment_status,
                      order_status: order.order_status,
                      created_at: order.created_at,
                      updated_at: order.updated_at,
                      platform: order.platform,
                      service_type: order.service_type,
                      service_details: order.service_details,
                      customer_notes: order.customer_notes,
                      admin_notes: order.admin_notes,
                      estimated_completion: order.estimated_completion,
                      completed_at: order.completed_at,
                      gta_account_email: order.gta_account_email,
                      gta_account_password: order.gta_account_password || null,
                      gta_account_credits: order.gta_account_credits
                    }, null, 2)}
                  </pre>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div>
                <h4 className="font-semibold mb-3">Quick Statistics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-background/50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary">${order.amount}</p>
                    <p className="text-xs text-muted-foreground">Order Value</p>
                  </div>
                  
                  <div className="bg-background/50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-400">
                      {Math.ceil((new Date().getTime() - new Date(order.created_at).getTime()) / (1000 * 60 * 60 * 24))}
                    </p>
                    <p className="text-xs text-muted-foreground">Days Since Created</p>
                  </div>
                  
                  <div className="bg-background/50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-400">
                      {order.gta_account_credits || 0}M
                    </p>
                    <p className="text-xs text-muted-foreground">GTA Credits</p>
                  </div>
                  
                  <div className="bg-background/50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-yellow-400">
                      {order.delivery_speed}
                    </p>
                    <p className="text-xs text-muted-foreground">Delivery Tier</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    
  );
}