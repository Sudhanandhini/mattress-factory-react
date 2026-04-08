import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const STATUS_OPTIONS = ['PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','RETURNED'];

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
  return new Date(s).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthStore();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/admin/orders?limit=1000`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        const orders = Array.isArray(data) ? data : data.data?.orders ?? data.orders ?? [];
        const found = orders.find((o: any) => o.id === id);
        if (found) {
          setOrder(found);
          setSelectedStatus(found.status);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, token]);

  const handleStatusUpdate = async () => {
    if (!order || selectedStatus === order.status) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`${API_URL}/admin/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: selectedStatus }),
      });
      if (res.ok) setOrder((prev: any) => ({ ...prev, status: selectedStatus }));
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a2a6c]" /></div>;
  }

  if (!order) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>Order not found</p>
        <Link to="/admin/orders" className="text-[#1a2a6c] hover:underline mt-2 inline-block">Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/orders" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order #{order.orderNumber}</h1>
          <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
        </div>
        <span className={`ml-auto text-xs font-semibold px-3 py-1.5 rounded-full ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
          {order.status}
        </span>
      </div>

      <div className="grid gap-5">
        {/* Status update */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-3">Update Status</h3>
          <div className="flex gap-3">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none"
            >
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
              onClick={handleStatusUpdate}
              disabled={updatingStatus || selectedStatus === order.status}
              className="px-4 py-2 bg-[#1a2a6c] text-white rounded-lg text-sm font-semibold hover:bg-[#092f75] disabled:opacity-50 transition-colors"
            >
              {updatingStatus ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>

        {/* Customer */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-3">Customer</h3>
          {order.user ? (
            <div className="text-sm text-gray-700 space-y-1">
              <p className="font-medium">{[order.user.firstName, order.user.lastName].filter(Boolean).join(' ') || '—'}</p>
              <p className="text-gray-500">{order.user.email}</p>
              {order.user.phone && <p className="text-gray-500">{order.user.phone}</p>}
            </div>
          ) : <p className="text-sm text-gray-400">Guest order</p>}
        </div>

        {/* Shipping */}
        {order.shippingAddress && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Shipping Address</h3>
            <div className="text-sm text-gray-700 space-y-0.5">
              {Object.values(order.shippingAddress).filter(Boolean).map((v, i) => (
                <p key={i}>{v as string}</p>
              ))}
            </div>
          </div>
        )}

        {/* Items */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>
          <div className="space-y-3">
            {(order.items || []).map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {item.image
                    ? <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                    : <Package className="w-5 h-5 text-gray-300" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                  {item.variantLabel && <p className="text-xs text-gray-400">{item.variantLabel}</p>}
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold text-gray-800">{formatCurrency(item.price * item.quantity)}</p>
                  <p className="text-xs text-gray-400">{formatCurrency(item.price)} × {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm">
            {order.subtotal != null && (
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
            )}
            {order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-gray-800 text-base pt-1 border-t border-gray-100">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
