'use client';

import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Products', value: '0', icon: Package, color: 'bg-blue-500' },
  { label: 'Total Orders', value: '0', icon: ShoppingCart, color: 'bg-green-500' },
  { label: 'Total Users', value: '0', icon: Users, color: 'bg-purple-500' },
  { label: 'Revenue', value: '₹0', icon: TrendingUp, color: 'bg-orange-500' },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <p className="text-gray-500">No recent activity. Import products to get started.</p>
      </div>
    </div>
  );
}
