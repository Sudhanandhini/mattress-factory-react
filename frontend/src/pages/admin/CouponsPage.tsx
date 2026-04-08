import { useEffect, useState } from 'react';
import { Plus, Trash2, AlertCircle, X, Check, Tag } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Coupon {
  id: string;
  code: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  minOrderAmount?: number;
  maxUses?: number;
  usedCount?: number;
  isActive: boolean;
  expiresAt?: string;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function CouponsPage() {
  const { token } = useAuthStore();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    code: '',
    type: 'PERCENTAGE' as 'PERCENTAGE' | 'FIXED',
    value: '',
    minOrderAmount: '',
    maxUses: '',
    expiresAt: '',
  });

  const fetchCoupons = () => {
    setLoading(true);
    fetch(`${API_URL}/coupons`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        setCoupons(Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : data.coupons ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchCoupons(); }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim() || !form.value) { setError('Code and value are required'); return; }
    setSubmitting(true);
    setError('');

    try {
      const payload: any = {
        code: form.code.trim().toUpperCase(),
        type: form.type,
        value: parseFloat(form.value),
        isActive: true,
      };
      if (form.minOrderAmount) payload.minOrderAmount = parseFloat(form.minOrderAmount);
      if (form.maxUses) payload.maxUses = parseInt(form.maxUses);
      if (form.expiresAt) payload.expiresAt = new Date(form.expiresAt).toISOString();

      const res = await fetch(`${API_URL}/coupons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create coupon');
      setShowForm(false);
      setForm({ code: '', type: 'PERCENTAGE', value: '', minOrderAmount: '', maxUses: '', expiresAt: '' });
      fetchCoupons();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`${API_URL}/coupons/${deleteId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setDeleteId(null);
    fetchCoupons();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Coupons</h1>
          <p className="text-sm text-gray-500 mt-0.5">{coupons.length} coupons</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setError(''); }}
          className="flex items-center gap-2 bg-[#1a2a6c] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#092f75] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Coupon
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : coupons.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            <Tag className="w-10 h-10 mx-auto mb-3 text-gray-200" />
            <p>No coupons yet</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Code</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Discount</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Min Order</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Uses</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {coupons.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">{c.code}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {c.type === 'PERCENTAGE' ? `${c.value}%` : formatCurrency(c.value)}
                    <span className="ml-1 text-xs text-gray-400 font-normal">{c.type === 'PERCENTAGE' ? 'off' : 'flat'}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                    {c.minOrderAmount ? formatCurrency(c.minOrderAmount) : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                    {c.usedCount ?? 0}{c.maxUses ? ` / ${c.maxUses}` : ''}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      c.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {c.isActive ? 'Active' : 'Inactive'}
                    </span>
                    {c.expiresAt && (
                      <p className="text-xs text-gray-400 mt-0.5">Expires {formatDate(c.expiresAt)}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setDeleteId(c.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Coupon modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800">Add Coupon</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Coupon Code *</label>
                <input
                  type="text"
                  value={form.code}
                  onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]/30"
                  placeholder="e.g. SAVE20"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Type *</label>
                  <select
                    value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value as any }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none"
                  >
                    <option value="PERCENTAGE">Percentage</option>
                    <option value="FIXED">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Value *</label>
                  <input
                    type="number"
                    value={form.value}
                    onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]/30"
                    placeholder={form.type === 'PERCENTAGE' ? '20' : '500'}
                    min="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Min Order (₹)</label>
                  <input
                    type="number"
                    value={form.minOrderAmount}
                    onChange={e => setForm(f => ({ ...f, minOrderAmount: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]/30"
                    placeholder="Optional"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Max Uses</label>
                  <input
                    type="number"
                    value={form.maxUses}
                    onChange={e => setForm(f => ({ ...f, maxUses: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]/30"
                    placeholder="Unlimited"
                    min="1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry Date</label>
                <input
                  type="date"
                  value={form.expiresAt}
                  onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]/30"
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1a2a6c] text-white rounded-lg text-sm font-semibold hover:bg-[#092f75] disabled:opacity-60"
                >
                  {submitting ? 'Creating...' : <><Check className="w-4 h-4" /> Create</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-bold text-gray-800">Delete Coupon?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-5">This coupon will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
