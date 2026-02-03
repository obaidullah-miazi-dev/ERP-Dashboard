import { useState, useEffect } from 'react';
import { DollarSign, ShoppingCart, Users, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/layout';
import {
  KPICard,
  RevenueChart,
  SalesChart,
  CategoryChart,
  GrowthChart,
  RecentOrdersTable,
} from '@/components/dashboard';
import { mockKPIs } from '@/data/mockData';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
          <KPICard
            title="Total Revenue"
            value={mockKPIs.totalRevenue.value}
            change={mockKPIs.totalRevenue.change}
            period={mockKPIs.totalRevenue.period}
            icon={DollarSign}
            loading={loading}
          />
          <KPICard
            title="Monthly Sales"
            value={mockKPIs.monthlySales.value}
            change={mockKPIs.monthlySales.change}
            period={mockKPIs.monthlySales.period}
            icon={ShoppingCart}
            loading={loading}
          />
          <KPICard
            title="Active Customers"
            value={mockKPIs.activeCustomers.value}
            change={mockKPIs.activeCustomers.change}
            period={mockKPIs.activeCustomers.period}
            icon={Users}
            loading={loading}
          />
          <KPICard
            title="Pending Orders"
            value={mockKPIs.pendingOrders.value}
            change={mockKPIs.pendingOrders.change}
            period={mockKPIs.pendingOrders.period}
            icon={Clock}
            loading={loading}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <SalesChart />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GrowthChart />
          </div>
          <CategoryChart />
        </div>

        {/* Recent Orders */}
        <RecentOrdersTable />
      </div>
    </DashboardLayout>
  );
};

export default Index;
