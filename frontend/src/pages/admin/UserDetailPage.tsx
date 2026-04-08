import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Shield, User, Package } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  PROCESSING: 'bg-indigo-100 text-indigo-700',
  SHIPPED: 'bg-cyan-100 text-cyan-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
  RETURNED: 'bg-gray-100 text-gray-700',
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthStore();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [togglingStatus, setTogglingStatus] = useState(false);

  const fetchUser = () => {
    if (!id) return;
    setLoading(true);
    fetch(`${API_URL}/admin/users?limit=1000`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        const users = Array.isArray(data) ? data : data.data?.users ?? data.users ?? [];
        const found = users.find((u: any) => u.id === id);
        setUser(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchUser(); }, [id, token]);

  const handleToggleStatus = async () => {
    if (!user) return;
    setTogglingStatus(true);
    const newStatus = user.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    await fetch(`${API_URL}/admin/users/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus }),
    });
    setTogglingStatus(false);
    fetchUser();
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a2a6c]" /></div>;
  }

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>User not found</p>
        <Link to="/admin/users" className="text-[#1a2a6c] hover:underline mt-2 inline-block">Back to Users</Link>
      </div>
    );
  }

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || '—';
  const isActive = user.status !== 'SUSPENDED';

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/users" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
      </div>

      <div className="grid gap-5">
        {/* Profile */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-full bg-[#1a2a6c]/10 flex items-center justify-center flex-shrink-0">
              {user.role === 'ADMIN'
                ? <Shield className="w-7 h-7 text-[#1a2a6c]" />
                : <User className="w-7 h-7 text-[#1a2a6c]" />
              }
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">{fullName}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                }`}>{user.role}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                }`}>{isActive ? 'Active' : 'Suspended'}</span>
              </div>
            </div>
            <button
              onClick={handleToggleStatus}
              disabled={togglingStatus}
              className={`ml-auto px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 ${
                isActive
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              {togglingStatus ? '...' : isActive ? 'Suspend' : 'Activate'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-5">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Joined</p>
              <p className="text-gray-700">{formatDate(user.createdAt)}</p>
            </div>
            {user.phone && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Phone</p>
                <p className="text-gray-700">{user.phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Orders */}
        {user.orders?.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Orders ({user.orders.length})</h3>
            <div className="space-y-2">
              {user.orders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">#{order.orderNumber}</p>
                    <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                      {order.status}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{formatCurrency(order.total)}</span>
                    <Link to={`/admin/orders/${order.id}`} className="text-xs text-[#1a2a6c] hover:underline">
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
