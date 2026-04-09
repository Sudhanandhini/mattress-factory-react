import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, LogOut, ChevronDown, ChevronUp, Pencil, X, Check, MapPin, CreditCard, Plus, Trash2, Home, Briefcase } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';
import bg from '../images/bg.jpg';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  type: 'HOME' | 'WORK' | 'OTHER';
  isDefault: boolean;
}

const EMPTY_ADDR: Omit<Address, 'id' | 'isDefault'> = {
  fullName: '', phone: '', addressLine1: '', addressLine2: '',
  city: '', state: '', pincode: '', landmark: '', type: 'HOME',
};

interface OrderItem { id: string; name: string; quantity: number; price: number; variantLabel?: string; }
interface OrderAddress { fullName: string; phone: string; addressLine1: string; addressLine2?: string; city: string; state: string; pincode: string; }
interface Payment { method: string; status: string; }
interface Order {
  id: string; orderNumber: string; status: string; total: number; createdAt: string;
  items: OrderItem[]; shippingAddress?: OrderAddress; payment?: Payment;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700', CONFIRMED: 'bg-blue-100 text-blue-700',
  PROCESSING: 'bg-indigo-100 text-indigo-700', SHIPPED: 'bg-cyan-100 text-cyan-700',
  DELIVERED: 'bg-green-100 text-green-700', CANCELLED: 'bg-red-100 text-red-700',
  RETURNED: 'bg-gray-100 text-gray-700',
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}
function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function AccountPage() {
  const { user, token, logout, setUser } = useAuthStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');

  // Profile edit
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({ firstName: '', lastName: '', phone: '' });

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<Record<string, Order>>({});
  const [loadingDetail, setLoadingDetail] = useState<string | null>(null);

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loadingAddr, setLoadingAddr] = useState(false);
  const [addrForm, setAddrForm] = useState<Omit<Address, 'id' | 'isDefault'> & { isDefault: boolean }>(
    { ...EMPTY_ADDR, isDefault: false }
  );
  const [editingAddrId, setEditingAddrId] = useState<string | 'new' | null>(null);
  const [savingAddr, setSavingAddr] = useState(false);

  useEffect(() => { if (!user || !token) navigate('/'); }, [user, token, navigate]);

  // Normalise order items from backend shape → UI shape
  const normaliseOrder = (o: any): Order => ({
    ...o,
    total: parseFloat(o.total) || 0,
    items: (o.items || []).map((item: any) => ({
      id:           item.id,
      name:         item.productName || item.name || 'Product',
      quantity:     item.quantity,
      price:        parseFloat(item.price) || 0,
      variantLabel: item.variantName || item.variantLabel || '',
    })),
  });

  // Fetch orders
  useEffect(() => {
    if (!token || activeTab !== 'orders') return;
    setLoadingOrders(true);
    fetch(`${API_URL}/orders`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => {
        const raw = Array.isArray(d) ? d : (d.data?.orders || d.orders || []);
        setOrders(raw.map(normaliseOrder));
        setLoadingOrders(false);
      })
      .catch(() => setLoadingOrders(false));
  }, [token, activeTab]);

  // Fetch addresses
  useEffect(() => {
    if (!token || activeTab !== 'addresses') return;
    setLoadingAddr(true);
    fetch(`${API_URL}/users/addresses`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { setAddresses(d.data || []); setLoadingAddr(false); })
      .catch(() => setLoadingAddr(false));
  }, [token, activeTab]);

  if (!user) return null;

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email;

  // ── Profile handlers ──
  const startEdit = () => {
    setProfileForm({ firstName: user.firstName || '', lastName: user.lastName || '', phone: (user as any).phone || '' });
    setEditing(true);
  };
  const saveProfile = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(profileForm),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.message || 'Update failed');
      setUser({ ...user, ...d.data });
      toast.success('Profile updated!');
      setEditing(false);
    } catch (e: any) { toast.error(e.message); } finally { setSaving(false); }
  };

  // ── Order handlers ──
  const toggleOrder = async (id: string) => {
    if (expandedOrderId === id) { setExpandedOrderId(null); return; }
    setExpandedOrderId(id);
    if (orderDetails[id]) return;
    setLoadingDetail(id);
    try {
      const res = await fetch(`${API_URL}/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      const d = await res.json();
      setOrderDetails(p => ({ ...p, [id]: normaliseOrder(d.data ?? d) }));
    } catch { toast.error('Could not load order details'); } finally { setLoadingDetail(null); }
  };

  // ── Address handlers ──
  const openNewAddr = () => {
    setAddrForm({ ...EMPTY_ADDR, isDefault: addresses.length === 0 });
    setEditingAddrId('new');
  };
  const openEditAddr = (addr: Address) => {
    setAddrForm({ fullName: addr.fullName, phone: addr.phone, addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2 || '', city: addr.city, state: addr.state,
      pincode: addr.pincode, landmark: addr.landmark || '', type: addr.type, isDefault: addr.isDefault });
    setEditingAddrId(addr.id);
  };
  const saveAddr = async () => {
    if (!addrForm.fullName || !addrForm.phone || !addrForm.addressLine1 || !addrForm.city || !addrForm.state || !addrForm.pincode) {
      toast.error('Please fill all required fields'); return;
    }
    setSavingAddr(true);
    try {
      const isNew = editingAddrId === 'new';
      const url = isNew ? `${API_URL}/users/addresses` : `${API_URL}/users/addresses/${editingAddrId}`;
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(addrForm),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.message);
      if (isNew) {
        setAddresses(p => addrForm.isDefault ? [d.data, ...p.map(a => ({ ...a, isDefault: false }))] : [...p, d.data]);
      } else {
        setAddresses(p => p.map(a => a.id === editingAddrId ? d.data : addrForm.isDefault ? { ...a, isDefault: false } : a));
      }
      toast.success(isNew ? 'Address added!' : 'Address updated!');
      setEditingAddrId(null);
    } catch (e: any) { toast.error(e.message); } finally { setSavingAddr(false); }
  };
  const deleteAddr = async (id: string) => {
    if (!confirm('Delete this address?')) return;
    try {
      await fetch(`${API_URL}/users/addresses/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      setAddresses(p => p.filter(a => a.id !== id));
      toast.success('Address deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const addrField = (label: string, key: keyof typeof addrForm, required = false, type = 'text') => (
    <div key={key}>
      <label className="text-xs text-gray-500 font-medium uppercase tracking-wide block mb-1">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
      <input
        type={type}
        value={addrForm[key] as string}
        onChange={e => setAddrForm(f => ({ ...f, [key]: e.target.value }))}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]/30 focus:border-[#1a2a6c]"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[220px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={bg} alt="background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
          <p className="text-gray-300 text-sm mb-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link> &rsaquo; My Account
          </p>
          <h1 className="text-4xl font-bold text-white">My Account</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* ── Sidebar ── */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-1 sticky top-4">
              <div className="flex items-center gap-3 pb-4 mb-2 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#1a2a6c] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {fullName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 truncate text-sm">{fullName}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              {([
                { key: 'profile',   icon: User,    label: 'Profile' },
                { key: 'addresses', icon: MapPin,   label: 'Addresses' },
                { key: 'orders',    icon: Package,  label: 'Orders' },
              ] as const).map(({ key, icon: Icon, label }) => (
                <button key={key} onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === key ? 'bg-[#1a2a6c] text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
              <button onClick={() => { logout(); navigate('/'); }}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors mt-2">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="md:col-span-3 space-y-4">

            {/* ══ PROFILE ══ */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-gray-800">Profile Details</h2>
                  {!editing ? (
                    <button onClick={startEdit}
                      className="flex items-center gap-1.5 text-sm font-semibold text-[#1a2a6c] hover:bg-[#1a2a6c]/8 px-3 py-1.5 rounded-lg transition-colors">
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => setEditing(false)}
                        className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
                        <X className="w-3.5 h-3.5" /> Cancel
                      </button>
                      <button onClick={saveProfile} disabled={saving}
                        className="flex items-center gap-1 text-sm font-semibold text-white bg-[#1a2a6c] hover:bg-[#0f1d4f] px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60">
                        <Check className="w-3.5 h-3.5" /> {saving ? 'Saving…' : 'Save'}
                      </button>
                    </div>
                  )}
                </div>

                {editing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[{ label: 'First Name', key: 'firstName' }, { label: 'Last Name', key: 'lastName' }].map(({ label, key }) => (
                      <div key={key}>
                        <label className="text-xs text-gray-500 font-medium uppercase tracking-wide block mb-1">{label}</label>
                        <input type="text" value={profileForm[key as keyof typeof profileForm]}
                          onChange={e => setProfileForm(f => ({ ...f, [key]: e.target.value }))}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]/30 focus:border-[#1a2a6c]" />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs text-gray-500 font-medium uppercase tracking-wide block mb-1">Email</label>
                      <input type="text" value={user.email} disabled className="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium uppercase tracking-wide block mb-1">Phone</label>
                      <input type="tel" value={profileForm.phone}
                        onChange={e => setProfileForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]/30 focus:border-[#1a2a6c]" />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { label: 'First Name', value: user.firstName },
                      { label: 'Last Name',  value: user.lastName },
                      { label: 'Email',      value: user.email },
                      { label: 'Phone',      value: (user as any).phone },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
                        <p className="mt-1 text-gray-800 font-medium">{value || '—'}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ══ ADDRESSES ══ */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-gray-800">My Addresses</h2>
                  {editingAddrId === null && (
                    <button onClick={openNewAddr}
                      className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#1a2a6c] hover:bg-[#0f1d4f] px-3 py-1.5 rounded-lg transition-colors">
                      <Plus className="w-3.5 h-3.5" /> Add Address
                    </button>
                  )}
                </div>

                {/* Address Form */}
                {editingAddrId !== null && (
                  <div className="border border-[#1a2a6c]/20 rounded-xl p-5 mb-5 bg-[#1a2a6c]/2">
                    <h3 className="text-sm font-bold text-gray-700 mb-4">{editingAddrId === 'new' ? 'New Address' : 'Edit Address'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {addrField('Full Name', 'fullName', true)}
                      {addrField('Phone', 'phone', true, 'tel')}
                      <div className="sm:col-span-2">{addrField('Address Line 1', 'addressLine1', true)}</div>
                      <div className="sm:col-span-2">{addrField('Address Line 2', 'addressLine2')}</div>
                      {addrField('City', 'city', true)}
                      {addrField('State', 'state', true)}
                      {addrField('Pincode', 'pincode', true)}
                      {addrField('Landmark', 'landmark')}
                      <div>
                        <label className="text-xs text-gray-500 font-medium uppercase tracking-wide block mb-1">Type</label>
                        <select value={addrForm.type} onChange={e => setAddrForm(f => ({ ...f, type: e.target.value as any }))}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]/30 focus:border-[#1a2a6c]">
                          <option value="HOME">Home</option>
                          <option value="WORK">Work</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2 pt-5">
                        <input type="checkbox" id="isDefault" checked={addrForm.isDefault}
                          onChange={e => setAddrForm(f => ({ ...f, isDefault: e.target.checked }))}
                          className="w-4 h-4 accent-[#1a2a6c]" />
                        <label htmlFor="isDefault" className="text-sm text-gray-700">Set as default address</label>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => setEditingAddrId(null)}
                        className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
                        <X className="w-3.5 h-3.5" /> Cancel
                      </button>
                      <button onClick={saveAddr} disabled={savingAddr}
                        className="flex items-center gap-1 text-sm font-semibold text-white bg-[#1a2a6c] hover:bg-[#0f1d4f] px-4 py-1.5 rounded-lg transition-colors disabled:opacity-60">
                        <Check className="w-3.5 h-3.5" /> {savingAddr ? 'Saving…' : 'Save Address'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Address List */}
                {loadingAddr ? (
                  <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />)}</div>
                ) : addresses.length === 0 && editingAddrId === null ? (
                  <div className="text-center py-10 text-gray-400">
                    <MapPin className="w-10 h-10 mx-auto mb-2 text-gray-200" />
                    <p className="text-sm">No saved addresses yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addresses.map(addr => (
                      <div key={addr.id} className={`relative border rounded-xl p-4 transition-colors ${addr.isDefault ? 'border-[#1a2a6c]/40 bg-[#1a2a6c]/3' : 'border-gray-100 bg-white'}`}>
                        {/* Type icon + badge */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            {addr.type === 'HOME' ? <Home className="w-3.5 h-3.5 text-[#1a2a6c]" /> : <Briefcase className="w-3.5 h-3.5 text-[#1a2a6c]" />}
                            <span className="text-xs font-bold text-[#1a2a6c] uppercase">{addr.type}</span>
                          </div>
                          {addr.isDefault && (
                            <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Default</span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-gray-800">{addr.fullName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{addr.phone}</p>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}<br />
                          {addr.city}, {addr.state} — {addr.pincode}
                          {addr.landmark ? <><br />Near: {addr.landmark}</> : null}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <button onClick={() => openEditAddr(addr)}
                            className="flex items-center gap-1 text-xs font-semibold text-[#1a2a6c] hover:bg-[#1a2a6c]/8 px-2.5 py-1 rounded-lg transition-colors">
                            <Pencil className="w-3 h-3" /> Edit
                          </button>
                          <button onClick={() => deleteAddr(addr.id)}
                            className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors">
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ══ ORDERS ══ */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-5">My Orders</h2>
                {loadingOrders ? (
                  <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}</div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="font-medium">No orders yet</p>
                    <p className="text-sm mt-1">Start shopping to see your orders here</p>
                    <Link to="/products" className="inline-block mt-4 bg-[#1a2a6c] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#092f75] transition-colors">Shop Now</Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map(order => {
                      const isOpen = expandedOrderId === order.id;
                      const detail = orderDetails[order.id];
                      const isLoadingThis = loadingDetail === order.id;
                      return (
                        <div key={order.id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
                          <button onClick={() => toggleOrder(order.id)}
                            className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="font-bold text-gray-800 text-sm">#{order.orderNumber}</span>
                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                              <p className="text-sm font-semibold text-[#1a2a6c] mt-1">{formatCurrency(order.total)}</p>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0 pt-1 text-[#1a2a6c]">
                              <span className="text-xs font-medium">{isOpen ? 'Hide' : 'Details'}</span>
                              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </div>
                          </button>

                          {isOpen && (
                            <div className="border-t border-gray-100 px-5 py-5 bg-gray-50 space-y-5">
                              {isLoadingThis ? (
                                <div className="space-y-2">{[1,2].map(i => <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />)}</div>
                              ) : detail ? (
                                <>
                                  <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Order Items</p>
                                    <div className="space-y-2">
                                      {detail.items.map((item, i) => (
                                        <div key={item.id ?? i} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-100">
                                          <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                                            {item.variantLabel && <p className="text-xs text-gray-500">{item.variantLabel}</p>}
                                          </div>
                                          <div className="text-right ml-4 flex-shrink-0">
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            <p className="text-sm font-semibold text-gray-800">{formatCurrency(item.price * item.quantity)}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="flex justify-between mt-3 px-1">
                                      <span className="text-sm font-bold text-gray-700">Total</span>
                                      <span className="text-base font-black text-[#1a2a6c]">{formatCurrency(detail.total)}</span>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {detail.shippingAddress && (
                                      <div className="bg-white rounded-lg border border-gray-100 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                          <MapPin className="w-3.5 h-3.5 text-[#1a2a6c]" />
                                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Shipping Address</p>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-800">{detail.shippingAddress.fullName}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{detail.shippingAddress.phone}</p>
                                        <p className="text-xs text-gray-600 mt-1">
                                          {detail.shippingAddress.addressLine1}{detail.shippingAddress.addressLine2 ? `, ${detail.shippingAddress.addressLine2}` : ''}
                                        </p>
                                        <p className="text-xs text-gray-600">{detail.shippingAddress.city}, {detail.shippingAddress.state} — {detail.shippingAddress.pincode}</p>
                                      </div>
                                    )}
                                    {detail.payment && (
                                      <div className="bg-white rounded-lg border border-gray-100 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                          <CreditCard className="w-3.5 h-3.5 text-[#1a2a6c]" />
                                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Payment</p>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-800 capitalize">{detail.payment.method?.replace(/_/g, ' ')}</p>
                                        <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${detail.payment.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                          {detail.payment.status}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <div className="space-y-2">
                                  {order.items?.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm bg-white px-4 py-2 rounded-lg border border-gray-100">
                                      <span className="text-gray-700">{item.name} × {item.quantity}</span>
                                      <span className="font-semibold text-gray-800">{formatCurrency(item.price * item.quantity)}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
