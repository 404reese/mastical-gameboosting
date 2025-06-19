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
  CreditCard,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { OrderService } from '@/lib/orderService';
import { AdminOrderView } from '@/types/order';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<AdminOrderView[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    completed: 0,
    cancelled: 0,
    totalRevenue: 0
  });  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch orders and stats in parallel
      const [ordersResult, statsResult] = await Promise.all([
        OrderService.getAllOrders(),
        OrderService.getOrderStats()
      ]);
      
      if (ordersResult.error || statsResult.error) {
        console.error('Error fetching data:', ordersResult.error || statsResult.error);
        setError('Failed to load dashboard data');      } else {
        setOrders((ordersResult.data || []).slice(0, 10)); // Get latest 10 orders
        setStats(statsResult.data || {
          total: 0,
          pending: 0,
          processing: 0,
          completed: 0,
          cancelled: 0,
          totalRevenue: 0
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to connect to database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      router.push('/admin');
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }
  // Calculate metrics from real data
  const metrics = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'Total Orders',
      value: stats.total.toString(),
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-blue-400'
    },
    {
      title: 'Pending Orders',
      value: stats.pending.toString(),
      change: stats.pending > 0 ? `${stats.pending} pending` : 'None pending',
      icon: Clock,
      color: 'text-yellow-400'
    },
    {
      title: 'Completed Orders',
      value: stats.completed.toString(),
      change: `${Math.round((stats.completed / stats.total) * 100) || 0}% completion rate`,
      icon: Users,
      color: 'text-purple-400'
    }
  ];

  // Get recent orders (last 5)
  const recentOrders = orders.slice(0, 5);

  // Generate recent activity from orders
  const recentActivity = orders.slice(0, 5).map((order, index) => ({
    type: 'order',
    message: `Order ${order.order_id} - ${order.service}`,
    time: new Date(order.created_at).toLocaleDateString(),
    status: order.order_status
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400';
      case 'Processing': return 'bg-blue-500/20 text-blue-400';
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };  return (
    
      <div className="space-y-8 p-8">
        {/* Error Message */}
        {error && (
          <Card className="bg-red-900/20 border-red-500/50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-red-400">
                <RefreshCw className="h-4 w-4" />
                <span>{error}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchData}
                  className="ml-auto"
                >
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-impact text-3xl font-bold text-glow">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your GTA5 boosting business.</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchData}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-[#1C1C1C] border-border/40 card-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    <div className="h-8 bg-muted/20 rounded animate-pulse" />
                    <div className="h-4 bg-muted/20 rounded animate-pulse w-2/3" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {metric.change}
                    </p>
                  </>
                )}
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
            </CardHeader>            <CardContent>              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading orders...</span>
                </div>
              ) : recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.order_id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm">{order.order_id}</span>
                          <Badge className={getStatusColor(order.order_status)}>{order.order_status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.customer_name}</p>
                        <p className="text-xs text-muted-foreground">{order.service}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{order.delivery_speed}</span>
                          <span>•</span>
                          <span>{order.platform || 'PC'}</span>
                          {order.gta_account_credits && (
                            <>
                              <span>•</span>
                              <span className="text-green-400 font-semibold">{order.gta_account_credits}M Credits</span>
                            </>
                          )}
                        </div>
                        {order.gta_account_email && (
                          <p className="text-xs text-blue-400 mt-1">GTA: {order.gta_account_email}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">${order.amount}</p>
                        <p className="text-xs text-muted-foreground">{new Date(order.order_date).toLocaleDateString()}</p>
                        <Badge variant="outline" className={order.payment_status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}>
                          {order.payment_status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No orders found
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-[#1C1C1C] border-border/40">
            <CardHeader>
              <CardTitle className="font-impact text-xl flex items-center">
                <Activity className="mr-2 h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading activity...</span>
                </div>
              ) : recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === 'Completed' ? 'bg-green-400' :
                        activity.status === 'Processing' || activity.status === 'In Progress' ? 'bg-blue-400' :
                        activity.status === 'Pending' ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                          <Badge variant="outline" className="text-xs">
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No recent activity
                </div>
              )}
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
    
  );
}