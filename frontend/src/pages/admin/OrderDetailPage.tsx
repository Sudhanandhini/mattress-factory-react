import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, CreditCard, Clock, User } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const STATUS_OPTIONS = ['PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','RETURNED'];

const STATUS_COLORS: Record<string, string> = {
  PENDING:    'bg-yellow-100 text-yellow-700',
  CONFIRMED:  'bg-blue-100 text-blue-700',
  PROCESSING: 'bg-indigo-100 text-indigo-700',
  SHIPPED:    'bg-cyan-100 text-cyan-700',
  DELIVERED:  'bg-green-100 text-green-700',
  CANCELLED:  'bg-red-100 text-red-700',
  RETURNED:   'bg-gray-100 text-gray-700',
};

const PAYMENT_STATUS_COLORS: Record<string, string> = {
  PAID:     'bg-green-100 text-green-700',
  PENDING:  'bg-yellow-100 text-yellow-700',
  FAILED:   'bg-red-100 text-red-700',
  REFUNDED: 'bg-purple-100 text-purple-700',
};

function fmt(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}
function fmtDate(s: string) {
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
    fetch(`${API_URL}/admin/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        const o = data.data ?? data;
        setOrder(o);
        setSelectedStatus(o.status);
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

  const addr = order.shippingAddress;
  const payment = order.payment;
  const customerName = order.user
    ? [order.user.firstName, order.user.lastName].filter(Boolean).join(' ') || order.user.email
    : 'Guest';

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/orders" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order #{order.orderNumber}</h1>
          <p className="text-sm text-gray-500">{fmtDate(order.createdAt)}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
            {order.status}
          </span>
          {order.paymentStatus && (
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${PAYMENT_STATUS_COLORS[order.paymentStatus] || 'bg-gray-100 text-gray-600'}`}>
              {order.paymentStatus}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-5">

        {/* Update Status */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-3">Update Order Status</h3>
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

        {/* Payment Info */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#1a2a6c]" /> Payment Information
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Method</p>
              <p className="text-sm font-semibold text-gray-800">
                {order.paymentMethod === 'RAZORPAY' ? 'Razorpay (Online)' : order.paymentMethod || '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Payment Status</p>
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${PAYMENT_STATUS_COLORS[order.paymentStatus] || 'bg-gray-100 text-gray-600'}`}>
                {order.paymentStatus || 'PENDING'}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Amount</p>
              <p className="text-sm font-semibold text-gray-800">{fmt(parseFloat(order.total))}</p>
            </div>
            {payment?.razorpayPaymentId && (
              <div className="col-span-2 sm:col-span-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Razorpay Payment ID</p>
                <p className="text-sm font-mono text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 break-all">
                  {payment.razorpayPaymentId}
                </p>
              </div>
            )}
            {payment?.paidAt && (
              <div className="col-span-2 sm:col-span-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Paid At</p>
                <p className="text-sm text-gray-700">{fmtDate(payment.paidAt)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Customer */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-[#1a2a6c]" /> Customer
          </h3>
          {order.user ? (
            <div className="text-sm text-gray-700 space-y-1">
              <p className="font-semibold">{customerName}</p>
              <p className="text-gray-500">{order.user.email}</p>
              {order.user.phone && <p className="text-gray-500">{order.user.phone}</p>}
              <Link to={`/admin/users/${order.user.id}`} className="text-[#1a2a6c] text-xs hover:underline">
                View Customer →
              </Link>
            </div>
          ) : <p className="text-sm text-gray-400">Guest order</p>}
        </div>

        {/* Shipping Address */}
        {addr && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#1a2a6c]" /> Shipping Address
            </h3>
            <div className="text-sm text-gray-700 space-y-0.5">
              <p className="font-semibold">{addr.fullName}</p>
              <p className="text-gray-500">{addr.phone}</p>
              <p>{addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}</p>
              <p>{addr.city}, {addr.state} — {addr.pincode}</p>
              {addr.landmark && <p className="text-gray-500">Near: {addr.landmark}</p>}
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-[#1a2a6c]" /> Order Items
          </h3>
          <div className="space-y-3">
            {(order.items || []).map((item: any, i: number) => {
              const img = item.product?.images?.[0]?.url;
              const name = item.productName || item.name || 'Product';
              const variant = item.variantName || item.variantLabel || item.variant?.label || '';
              return (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {img
                      ? <img src={img.startsWith('http') ? img : `${API_URL.replace('/api','')}${img}`} alt={name} className="w-full h-full object-cover" />
                      : <Package className="w-5 h-5 text-gray-300" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm">{name}</p>
                    {variant && <p className="text-xs text-gray-400">{variant}</p>}
                  </div>
                  <div className="text-right text-sm flex-shrink-0">
                    <p className="font-semibold text-gray-800">{fmt(parseFloat(item.price) * item.quantity)}</p>
                    <p className="text-xs text-gray-400">{fmt(parseFloat(item.price))} × {item.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals */}
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span><span>{fmt(parseFloat(order.subtotal))}</span>
            </div>
            {parseFloat(order.tax) > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>GST (18%)</span><span>{fmt(parseFloat(order.tax))}</span>
              </div>
            )}
            {parseFloat(order.discount) > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount{order.couponCode ? ` (${order.couponCode})` : ''}</span>
                <span>-{fmt(parseFloat(order.discount))}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-gray-800 text-base pt-2 border-t border-gray-100">
              <span>Total</span><span>{fmt(parseFloat(order.total))}</span>
            </div>
          </div>
        </div>

        {/* Status History */}
        {order.statusHistory?.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1a2a6c]" /> Status History
            </h3>
            <div className="space-y-3">
              {order.statusHistory.map((h: any, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1a2a6c] mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[h.status] || 'bg-gray-100 text-gray-600'}`}>
                        {h.status}
                      </span>
                      <span className="text-xs text-gray-400">{fmtDate(h.createdAt)}</span>
                    </div>
                    {h.notes && <p className="text-xs text-gray-500 mt-0.5">{h.notes}</p>}
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
