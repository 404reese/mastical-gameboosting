'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Eye, Download, RefreshCw, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { OrderService } from '@/lib/orderService';
import { AdminOrderView } from '@/types/order';

export default function OrdersManagement() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<AdminOrderView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadOrders();
    } else {
      router.push('/admin');
    }
  }, [router]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await OrderService.getAllOrders();
      
      if (error) {
        setError('Failed to load orders');
        console.error('Error loading orders:', error);
      } else {
        setOrders(data || []);
      }
    } catch (err) {
      setError('Failed to load orders');
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadOrders();
  };
  const handleExport = () => {
    // Convert orders to CSV
    const headers = ['Order ID', 'Customer Name', 'Email', 'Service', 'Amount', 'Payment Status', 'Order Status', 'Platform', 'GTA Credits', 'GTA Account', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredOrders.map(order => [
        order.order_id,
        order.customer_name,
        order.customer_email || '',
        `"${order.service}"`,
        order.amount,
        order.payment_status,
        order.order_status,
        order.platform || '',
        order.gta_account_credits || '',
        order.gta_account_email || '',
        order.order_date
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.customer_email && order.customer_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         order.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.order_status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

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

  // Add quick action to mark order as completed
  const handleMarkCompleted = async (orderId: string) => {
    try {
      const result = await OrderService.markOrderCompleted(orderId);
      if (result.error) {
        console.error('Failed to mark order completed:', result.error);
        setError('Failed to mark order as completed');
      } else {
        // Refresh orders to show updated status
        loadOrders();
      }
    } catch (error) {
      console.error('Error marking order completed:', error);
      setError('Error marking order as completed');
    }
  };

  // Add function to handle manual payment status updates
  const handleMarkPaid = async (orderId: string) => {
    try {
      const result = await OrderService.updatePaymentStatus(orderId, 'Completed');
      if (result.error) {
        console.error('Failed to mark order as paid:', result.error);
        setError('Failed to mark order as paid');
      } else {
        // Refresh orders to show updated status
        loadOrders();
      }
    } catch (error) {
      console.error('Error marking order as paid:', error);
      setError('Error marking order as paid');
    }
  };


  return (
    <div className="space-y-6 p-8">
      {/* Header */}      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-impact text-3xl font-bold text-glow">Orders Management</h1>
          <p className="text-muted-foreground">Manage and track all customer orders</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="bg-[#1C1C1C] border-border/40">
        <CardHeader>
          <CardTitle className="font-impact text-xl">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Customer Name, or Email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>        {/* Orders Table */}
      <Card className="bg-[#1C1C1C] border-border/40">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-impact text-xl">Orders ({filteredOrders.length})</CardTitle>
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + ordersPerPage, filteredOrders.length)} of {filteredOrders.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-500/20 text-red-400 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading orders...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">                <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left py-3 px-2 font-semibold">Order ID</th>
                    <th className="text-left py-3 px-2 font-semibold">Customer</th>
                    <th className="text-left py-3 px-2 font-semibold">Service</th>
                    <th className="text-left py-3 px-2 font-semibold">GTA Credits</th>
                    <th className="text-left py-3 px-2 font-semibold">Amount</th>
                    <th className="text-left py-3 px-2 font-semibold">Payment</th>
                    <th className="text-left py-3 px-2 font-semibold">Status</th>
                    <th className="text-left py-3 px-2 font-semibold">Date</th>
                    <th className="text-left py-3 px-2 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-8 text-muted-foreground">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    paginatedOrders.map((order) => (
                      <tr key={order.order_id} className="border-b border-border/20 hover:bg-background/50">
                        <td className="py-3 px-2">
                          <span className="font-mono text-sm">{order.order_id}</span>
                        </td>
                        <td className="py-3 px-2">
                          <div>
                            <p className="font-semibold text-sm">{order.customer_name}</p>
                            <p className="text-xs text-muted-foreground">{order.customer_email || 'No email'}</p>
                            {order.gta_account_email && (
                              <p className="text-xs text-blue-400 mt-1">GTA: {order.gta_account_email}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <div>
                            <p className="text-sm">{order.service}</p>
                            <div className="flex gap-1 mt-1">
                              {order.platform && (
                                <Badge variant="outline" className="text-xs">{order.platform}</Badge>
                              )}
                              {order.service_type && (
                                <Badge variant="secondary" className="text-xs">{order.service_type}</Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          {order.gta_account_credits ? (
                            <span className="font-semibold text-green-400">
                              {order.gta_account_credits}M
                            </span>
                          ) : (
                            <span className="text-muted-foreground text-sm">N/A</span>
                          )}
                        </td>
                        <td className="py-3 px-2">
                          <span className="font-semibold text-primary">${order.amount}</span>
                        </td>                        <td className="py-3 px-2">
                          <Badge className={getPaymentStatusColor(order.payment_status)}>
                            {order.payment_status}
                          </Badge>
                          {order.payment_status === 'Completed' && (
                            <div className="text-xs text-green-400 mt-1">✓ Paid</div>
                          )}
                          {order.payment_status === 'Pending' && (
                            <div className="text-xs text-yellow-400 mt-1">⏳ Awaiting payment</div>
                          )}
                        </td>
                        <td className="py-3 px-2">
                          <Badge className={getStatusColor(order.order_status)}>
                            {order.order_status}
                          </Badge>
                          {order.order_status === 'Processing' && order.payment_status === 'Completed' && (
                            <div className="text-xs text-blue-400 mt-1">Ready for delivery</div>
                          )}
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-sm text-muted-foreground">{order.order_date}</span>
                          {order.completed_at && (
                            <div className="text-xs text-green-400">
                              Completed: {new Date(order.completed_at).toLocaleDateString()}
                            </div>
                          )}
                        </td>                        <td className="py-3 px-2">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/admin/orders/${order.order_id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            
                            {order.payment_status === 'Pending' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleMarkPaid(order.order_id)}
                                className="text-blue-400 hover:text-blue-300"
                                title="Mark payment as completed"
                              >
                                💳
                              </Button>
                            )}
                            
                            {order.payment_status === 'Completed' && 
                             order.order_status === 'Processing' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleMarkCompleted(order.order_id)}
                                className="text-green-400 hover:text-green-300"
                                title="Mark order as completed"
                              >
                                ✓
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "bg-primary" : ""}
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}