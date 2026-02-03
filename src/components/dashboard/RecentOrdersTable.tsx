import { useState } from 'react';
import { mockOrders } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const statusStyles: Record<string, string> = {
  completed: 'badge-success',
  processing: 'badge-info',
  pending: 'badge-warning',
  shipped: 'bg-purple-100 text-purple-700 border-purple-200',
  cancelled: 'badge-destructive',
};

export function RecentOrdersTable() {
  const [orders] = useState(mockOrders.slice(0, 5));

  return (
    <div className="premium-card overflow-hidden">
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <p className="text-sm text-muted-foreground">
              Latest transactions across all channels
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="font-medium">{order.id}</td>
                <td>{order.customer}</td>
                <td className="text-muted-foreground">{order.date}</td>
                <td className="font-medium">
                  ${order.total.toLocaleString()}
                </td>
                <td>
                  <Badge
                    variant="outline"
                    className={cn('capitalize', statusStyles[order.status])}
                  >
                    {order.status}
                  </Badge>
                </td>
                <td className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Order</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
