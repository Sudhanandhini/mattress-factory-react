'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  sku: string;
  shortDescription: string;
  description: string;
  basePrice: string;
  discountPrice: string;
  stock: string;
  lowStockAlert: string;
  brand: string;
  material: string;
  warranty: string;
  status: string;
  isFeatured: boolean;
}

const EMPTY_FORM: FormData = {
  name: '', sku: '', shortDescription: '', description: '',
  basePrice: '', discountPrice: '', stock: '', lowStockAlert: '10',
  brand: '', material: '', warranty: '', status: 'ACTIVE', isFeatured: false,
};

const inputCls = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white';
const labelCls = 'block text-sm font-medium text-gray-700 mb-1.5';

export default function EditProductPage() {
  const router = useRouter();
  const { id: productId } = useParams<{ id: string }>();

  const [loading, setLoading]         = useState(true);
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState('');
  const [success, setSuccess]         = useState('');
  const [productName, setProductName] = useState('');
  const [formData, setFormData]       = useState<FormData>(EMPTY_FORM);

  useEffect(() => {
    if (!productId) return;
    (async () => {
      try {
        const res = await fetch(`/api/admin/products/${productId}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const product = await res.json();

        setProductName(product.name || '');
        setFormData({
          name:             product.name             || '',
          sku:              product.sku              || '',
          shortDescription: product.shortDescription || '',
          description:      product.description      || '',
          basePrice:        product.basePrice        != null ? String(parseFloat(product.basePrice))     : '',
          discountPrice:    product.discountPrice    != null ? String(parseFloat(product.discountPrice)) : '',
          stock:            product.stock            != null ? String(product.stock)         : '0',
          lowStockAlert:    product.lowStockAlert    != null ? String(product.lowStockAlert) : '10',
          brand:            product.brand            || '',
          material:         product.material         || '',
          warranty:         product.warranty         || '',
          status:           product.status           || 'ACTIVE',
          isFeatured:       Boolean(product.isFeatured),
        });
      } catch {
        setError('Could not load product.');
      } finally {
        setLoading(false);
      }
    })();
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:             formData.name,
          shortDescription: formData.shortDescription,
          description:      formData.description,
          basePrice:        formData.basePrice     ? parseFloat(formData.basePrice)     : null,
          discountPrice:    formData.discountPrice ? parseFloat(formData.discountPrice) : null,
          stock:            formData.stock         ? parseInt(formData.stock)           : 0,
          lowStockAlert:    formData.lowStockAlert ? parseInt(formData.lowStockAlert)   : 10,
          brand:            formData.brand    || null,
          material:         formData.material || null,
          warranty:         formData.warranty || null,
          status:           formData.status,
          isFeatured:       formData.isFeatured,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
      setSuccess('Product updated successfully!');
      setTimeout(() => router.push('/admin/products'), 1200);
    } catch (e: any) {
      setError(e.message || 'Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh] gap-3 text-gray-500">
      <Loader2 className="w-5 h-5 animate-spin" /> Loading product...
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="p-2 rounded-lg hover:bg-gray-100 transition">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          {productName && <p className="text-sm text-gray-500 mt-0.5">{productName}</p>}
        </div>
      </div>

      {/* Alerts */}
      {error   && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="md:col-span-2">
              <label className={labelCls}>Product Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                required className={inputCls} placeholder="Product name" />
            </div>

            <div>
              <label className={labelCls}>SKU <span className="text-gray-400 font-normal">(read-only)</span></label>
              <input type="text" value={formData.sku} disabled
                className={`${inputCls} bg-gray-50 text-gray-400 cursor-not-allowed`} />
            </div>

            <div>
              <label className={labelCls}>Brand</label>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange}
                className={inputCls} placeholder="e.g. Refresh Springs" />
            </div>

            <div className="md:col-span-2">
              <label className={labelCls}>Short Description</label>
              <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange}
                rows={2} className={inputCls} placeholder="Brief product summary" />
            </div>

            <div className="md:col-span-2">
              <label className={labelCls}>Full Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange}
                rows={6} className={inputCls} placeholder="Detailed product description" />
            </div>
          </div>
        </div>

        {/* Pricing + Inventory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3">Pricing</h2>
            <div>
              <label className={labelCls}>Base Price (₹)</label>
              <input type="number" name="basePrice" value={formData.basePrice} onChange={handleChange}
                step="0.01" min="0" className={inputCls} placeholder="0.00" />
            </div>
            <div>
              <label className={labelCls}>Sale Price (₹) <span className="text-gray-400 font-normal">optional</span></label>
              <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleChange}
                step="0.01" min="0" className={inputCls} placeholder="0.00" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3">Inventory</h2>
            <div>
              <label className={labelCls}>Stock Quantity</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange}
                min="0" className={inputCls} placeholder="0" />
            </div>
            <div>
              <label className={labelCls}>Low Stock Alert Threshold</label>
              <input type="number" name="lowStockAlert" value={formData.lowStockAlert} onChange={handleChange}
                min="0" className={inputCls} placeholder="10" />
            </div>
          </div>
        </div>

        {/* Details + Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3">Product Details</h2>
            <div>
              <label className={labelCls}>Material</label>
              <input type="text" name="material" value={formData.material} onChange={handleChange}
                className={inputCls} placeholder="e.g. Memory Foam" />
            </div>
            <div>
              <label className={labelCls}>Warranty</label>
              <input type="text" name="warranty" value={formData.warranty} onChange={handleChange}
                className={inputCls} placeholder="e.g. 5 Years" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-semibold text-gray-800 border-b border-gray-100 pb-3">Status & Visibility</h2>
            <div>
              <label className={labelCls}>Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className={inputCls}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
                <option value="DISCONTINUED">Discontinued</option>
              </select>
            </div>
            <label className="flex items-center gap-3 cursor-pointer group pt-1">
              <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Featured Product</p>
                <p className="text-xs text-gray-400">Show on homepage featured section</p>
              </div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-2">
          <Link href="/admin/products"
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            Cancel
          </Link>
          <button type="submit" disabled={submitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50">
            {submitting
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
              : <><Save className="w-4 h-4" /> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
}
