'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  ShoppingCart, 
  Clock, 
  Users, 
  TrendingUp, 
  Activity,
  ArrowRight,
  Package,
  CreditCard
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // Mock data - replace with real data from your backend
  const metrics = [
    {
      title: 'Total Sales',
      value: '$24,567.89',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-blue-400'
    },
    {
      title: 'Pending Orders',
      value: '23',
      change: '-5.1%',
      icon: Clock,
      color: 'text-yellow-400'
    },
    {
      title: 'New Customers',
      value: '89',
      change: '+15.3%',
      icon: Users,
      color: 'text-purple-400'
    }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', service: 'PC Money Boost', amount: '$9.99', status: 'Completed', date: '2024-01-15' },
    { id: '#1235', customer: 'Jane Smith', service: 'Xbox Rank Boost', amount: '$15.99', status: 'Processing', date: '2024-01-15' },
    { id: '#1236', customer: 'Mike Johnson', service: 'PS5 Credits', amount: '$7.99', status: 'Pending', date: '2024-01-14' },
    { id: '#1237', customer: 'Sarah Wilson', service: 'Heist Completion', amount: '$19.99', status: 'Completed', date: '2024-01-14' },
    { id: '#1238', customer: 'Tom Brown', service: 'Unlock All', amount: '$24.99', status: 'Processing', date: '2024-01-13' }
  ];

  const recentActivity = [
    { type: 'order', message: 'New order #1238 received', time: '2 minutes ago' },
    { type: 'customer', message: 'New customer registration: Tom Brown', time: '15 minutes ago' },
    { type: 'payment', message: 'Payment completed for order #1237', time: '1 hour ago' },
    { type: 'order', message: 'Order #1236 status updated to Processing', time: '2 hours ago' },
    { type: 'customer', message: 'New customer registration: Sarah Wilson', time: '3 hours ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400';
      case 'Processing': return 'bg-blue-500/20 text-blue-400';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-impact text-3xl font-bold text-glow">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your GTA5 boosting business.</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-[#1C1C1C] border-border/40 card-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card className="bg-[#1C1C1C] border-border/40">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-impact text-xl">Recent Orders</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/orders">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm">{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{order.amount}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-[#1C1C1C] border-border/40">
            <CardHeader>
              <CardTitle className="font-impact text-xl flex items-center">
                <Activity className="mr-2 h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'order' ? 'bg-blue-400' :
                      activity.type === 'customer' ? 'bg-green-400' :
                      'bg-yellow-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-[#1C1C1C] border-border/40">
          <CardHeader>
            <CardTitle className="font-impact text-xl">Quick Actions</CardTitle>
            <CardDescription>Frequently accessed admin functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                <Link href="/admin/orders">
                  <Package className="h-6 w-6" />
                  <span>Manage Orders</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                <Link href="/admin/services">
                  <TrendingUp className="h-6 w-6" />
                  <span>Manage Services</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
                <Link href="/admin/customers">
                  <Users className="h-6 w-6" />
                  <span>View Customers</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}