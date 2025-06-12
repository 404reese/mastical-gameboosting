'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Eye, Download, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function OrdersManagement() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin');
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  // Mock orders data - replace with real data from your backend
  const allOrders = [
    { id: '#1234', customer: 'John Doe', email: 'john@example.com', service: 'PC Money Boost - $10M', amount: '$9.99', paymentStatus: 'Completed', orderStatus: 'Completed', date: '2024-01-15', platform: 'PC' },
    { id: '#1235', customer: 'Jane Smith', email: 'jane@example.com', service: 'Xbox Rank Boost - Level 100', amount: '$15.99', paymentStatus: 'Completed', orderStatus: 'Processing', date: '2024-01-15', platform: 'Xbox' },
    { id: '#1236', customer: 'Mike Johnson', email: 'mike@example.com', service: 'PS5 Credits - Megalodon', amount: '$7.99', paymentStatus: 'Pending', orderStatus: 'Pending', date: '2024-01-14', platform: 'PS5' },
    { id: '#1237', customer: 'Sarah Wilson', email: 'sarah@example.com', service: 'Heist Completion - Cayo Perico', amount: '$19.99', paymentStatus: 'Completed', orderStatus: 'Completed', date: '2024-01-14', platform: 'PC' },
    { id: '#1238', customer: 'Tom Brown', email: 'tom@example.com', service: 'Unlock All - Premium Package', amount: '$24.99', paymentStatus: 'Completed', orderStatus: 'Processing', date: '2024-01-13', platform: 'Xbox' },
    { id: '#1239', customer: 'Lisa Davis', email: 'lisa@example.com', service: 'Account Recovery - Permanent Ban', amount: '$49.99', paymentStatus: 'Completed', orderStatus: 'Pending', date: '2024-01-13', platform: 'PC' },
    { id: '#1240', customer: 'Chris Lee', email: 'chris@example.com', service: 'PC Money Boost - $25M', amount: '$19.99', paymentStatus: 'Refunded', orderStatus: 'Cancelled', date: '2024-01-12', platform: 'PC' },
    { id: '#1241', customer: 'Amy White', email: 'amy@example.com', service: 'PS5 Rank Boost - Level 50', amount: '$12.99', paymentStatus: 'Completed', orderStatus: 'Completed', date: '2024-01-12', platform: 'PS5' }
  ];

  // Filter orders based on search and status
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.orderStatus.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400';
      case 'Processing': return 'bg-blue-500/20 text-blue-400';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'Cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'Refunded': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-impact text-3xl font-bold text-glow">Orders Management</h1>
            <p className="text-muted-foreground">Manage and track all customer orders</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
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
        </Card>

        {/* Orders Table */}
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left py-3 px-2 font-semibold">Order ID</th>
                    <th className="text-left py-3 px-2 font-semibold">Customer</th>
                    <th className="text-left py-3 px-2 font-semibold">Service</th>
                    <th className="text-left py-3 px-2 font-semibold">Amount</th>
                    <th className="text-left py-3 px-2 font-semibold">Payment</th>
                    <th className="text-left py-3 px-2 font-semibold">Status</th>
                    <th className="text-left py-3 px-2 font-semibold">Date</th>
                    <th className="text-left py-3 px-2 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border/20 hover:bg-background/50">
                      <td className="py-3 px-2">
                        <span className="font-mono text-sm">{order.id}</span>
                      </td>
                      <td className="py-3 px-2">
                        <div>
                          <p className="font-semibold text-sm">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">{order.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div>
                          <p className="text-sm">{order.service}</p>
                          <Badge variant="outline" className="text-xs mt-1">{order.platform}</Badge>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="font-semibold text-primary">{order.amount}</span>
                      </td>
                      <td className="py-3 px-2">
                        <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                          {order.paymentStatus}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        <Badge className={getStatusColor(order.orderStatus)}>
                          {order.orderStatus}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-sm text-muted-foreground">{order.date}</span>
                      </td>
                      <td className="py-3 px-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/orders/${order.id.replace('#', '')}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
    </AdminLayout>
  );
}