import { useEffect, useState } from 'react';
import { Save, Globe, Search, FileText, Package, ChevronRight, RefreshCw } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface GlobalSeo {
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  googleAnalyticsId: string;
  robotsTxt: string;
}

interface PageSeoItem {
  metaTitle: string;
  metaDescription: string;
  focusKeywords: string;
  canonicalUrl: string;
}

type PageSeoMap = Record<string, PageSeoItem>;

interface ProductSeoItem {
  id: string;
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  focusKeywords: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGES = [
  { label: 'About Us',         path: '/about',    route: 'about'    },
  { label: 'Products Listing', path: '/products', route: 'products' },
  { label: 'Cart Page',        path: '/cart',     route: 'cart'     },
  { label: 'Contact Us',       path: '/contact',  route: 'contact'  },
  { label: 'Checkout Page',    path: '/checkout', route: 'checkout' },
  { label: 'Home Page',        path: '/',         route: 'home'     },
];

const PAGE_ICONS: Record<string, React.ReactNode> = {
  about:    <span className="text-base">ℹ️</span>,
  products: <Package className="w-4 h-4" />,
  cart:     <span className="text-base">🛒</span>,
  contact:  <span className="text-base">📞</span>,
  checkout: <span className="text-base">💳</span>,
  home:     <span className="text-base">🏠</span>,
};

const EMPTY_PAGE_SEO: PageSeoItem = {
  metaTitle: '',
  metaDescription: '',
  focusKeywords: '',
  canonicalUrl: '',
};

const DEFAULT_GLOBAL: GlobalSeo = {
  siteTitle: 'Mattress Factory – Sulakshmi Enterprise | Best Mattresses in Bangalore',
  siteDescription: 'Buy premium quality mattresses at factory prices. Free delivery, 100-night trial, 10-year warranty. Latex, Memory Foam, Ortho mattresses.',
  siteKeywords: 'mattress, latex mattress, memory foam mattress, ortho mattress, Bangalore, buy mattress online',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  googleAnalyticsId: '',
  robotsTxt: 'User-agent: *\nAllow: /',
};

type Tab = 'global' | 'page' | 'products';

// ─── Sub-components ───────────────────────────────────────────────────────────

function GooglePreview({ title, description, url }: { title: string; description: string; url: string }) {
  const displayTitle = title || 'Page Title will appear here';
  const displayDesc = description || 'Your meta description will appear here...';
  const displayUrl = url || 'mattressfactory.in' + url;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Google Search Preview</p>
      <div className="space-y-0.5">
        <p className="text-xs text-gray-500">{displayUrl}</p>
        <p className="text-blue-700 text-lg font-medium leading-snug hover:underline cursor-pointer">{displayTitle}</p>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{displayDesc}</p>
      </div>
    </div>
  );
}

// ─── Global SEO Tab ───────────────────────────────────────────────────────────

function GlobalSeoTab({ token }: { token: string | null }) {
  const [settings, setSettings] = useState<GlobalSeo>(DEFAULT_GLOBAL);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/admin/seo`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setSettings({ ...DEFAULT_GLOBAL, ...data }); })
      .catch(() => {});
  }, [token]);

  const set = (key: keyof GlobalSeo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setSettings(prev => ({ ...prev, [key]: e.target.value }));

  const handleSave = async () => {
    setSaving(true); setError(''); setSaved(false);
    try {
      const res = await fetch(`${API_URL}/admin/seo`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed to save');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Google Preview */}
      <GooglePreview
        title={settings.siteTitle}
        description={settings.siteDescription}
        url="mattressfactory.in"
      />

      {/* Basic Meta */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Search className="w-4 h-4 text-gray-400" />
          <h3 className="font-semibold text-gray-800">Meta Tags</h3>
        </div>
        <Field label="Site Title" hint={`${settings.siteTitle.length}/60 chars`}>
          <input type="text" value={settings.siteTitle} onChange={set('siteTitle')}
            className={INPUT} placeholder="Your site title" />
        </Field>
        <Field label="Meta Description" hint={`${settings.siteDescription.length}/160 chars`}>
          <textarea value={settings.siteDescription} onChange={set('siteDescription')}
            rows={3} className={INPUT} placeholder="Brief description of your site" />
        </Field>
        <Field label="Focus Keywords" hint="Comma-separated">
          <input type="text" value={settings.siteKeywords} onChange={set('siteKeywords')}
            className={INPUT} placeholder="mattress, buy mattress online" />
        </Field>
      </div>

      {/* Open Graph */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 className="font-semibold text-gray-800">Open Graph (Social Media)</h3>
        <Field label="OG Title">
          <input type="text" value={settings.ogTitle} onChange={set('ogTitle')}
            className={INPUT} placeholder="Leave blank to use site title" />
        </Field>
        <Field label="OG Description">
          <textarea value={settings.ogDescription} onChange={set('ogDescription')}
            rows={2} className={INPUT} placeholder="Leave blank to use meta description" />
        </Field>
        <Field label="OG Image URL" hint="Recommended: 1200×630px">
          <input type="text" value={settings.ogImage} onChange={set('ogImage')}
            className={INPUT} placeholder="https://..." />
        </Field>
      </div>

      {/* Analytics */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 className="font-semibold text-gray-800">Analytics</h3>
        <Field label="Google Analytics ID">
          <input type="text" value={settings.googleAnalyticsId} onChange={set('googleAnalyticsId')}
            className={INPUT} placeholder="G-XXXXXXXXXX" />
        </Field>
      </div>

      {/* Robots */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
        <h3 className="font-semibold text-gray-800">robots.txt</h3>
        <textarea value={settings.robotsTxt} onChange={set('robotsTxt')}
          rows={5} className={`${INPUT} font-mono`} />
      </div>

      {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">{error}</p>}
      {saved && <p className="text-green-700 text-sm bg-green-50 px-4 py-3 rounded-lg">Settings saved successfully!</p>}

      <SaveBtn saving={saving} onClick={handleSave} />
    </div>
  );
}

// ─── Page SEO Tab ─────────────────────────────────────────────────────────────

function PageSeoTab({ token }: { token: string | null }) {
  const [selected, setSelected] = useState(PAGES[0].route);
  const [seoMap, setSeoMap] = useState<PageSeoMap>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/admin/seo/pages`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.data) setSeoMap(data.data); })
      .catch(() => {});
  }, [token]);

  const page = PAGES.find(p => p.route === selected)!;
  const current: PageSeoItem = seoMap[selected] ?? EMPTY_PAGE_SEO;

  const set = (key: keyof PageSeoItem) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setSeoMap(prev => ({ ...prev, [selected]: { ...(prev[selected] ?? EMPTY_PAGE_SEO), [key]: e.target.value } }));

  const handleSave = async () => {
    setSaving(true); setError(''); setSaved(false);
    try {
      const res = await fetch(`${API_URL}/admin/seo/pages/${selected}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(current),
      });
      if (!res.ok) throw new Error('Failed to save');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex gap-6">
      {/* Left Sidebar */}
      <div className="w-56 flex-shrink-0">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Pages</p>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {PAGES.map((p) => (
            <button
              key={p.route}
              onClick={() => { setSelected(p.route); setSaved(false); setError(''); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors border-b border-gray-50 last:border-b-0 ${
                selected === p.route
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex-shrink-0 text-gray-400">{PAGE_ICONS[p.route]}</span>
              <span className="flex-1 text-left">{p.label}</span>
              {selected === p.route && <ChevronRight className="w-4 h-4 text-blue-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 min-w-0 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{page.label}</h2>
            <p className="text-sm text-gray-400 mt-0.5">{page.path}</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save
          </button>
        </div>

        {/* Google Preview */}
        <GooglePreview
          title={current.metaTitle || `${page.label} - Mattress Factory`}
          description={current.metaDescription}
          url={`mattressfactory.in${page.path}`}
        />

        {/* Meta Tags Form */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <h3 className="font-semibold text-gray-800">Meta Tags</h3>
          </div>

          <Field label="Meta Title" hint={`${current.metaTitle.length}/60 chars`}>
            <input
              type="text"
              value={current.metaTitle}
              onChange={set('metaTitle')}
              className={INPUT}
              placeholder={`${page.label} | Mattress Factory`}
            />
          </Field>

          <Field label="Meta Description" hint={`${current.metaDescription.length}/160 chars`}>
            <textarea
              value={current.metaDescription}
              onChange={set('metaDescription')}
              rows={3}
              className={INPUT}
              placeholder="Describe this page in 1-2 sentences..."
            />
          </Field>

          <Field label="Focus Keywords" hint="Comma-separated">
            <input
              type="text"
              value={current.focusKeywords}
              onChange={set('focusKeywords')}
              className={INPUT}
              placeholder="mattress, buy mattress online"
            />
          </Field>

          <Field label="Canonical URL" hint="Leave blank to use default">
            <input
              type="text"
              value={current.canonicalUrl}
              onChange={set('canonicalUrl')}
              className={INPUT}
              placeholder={`https://mattressfactory.in${page.path}`}
            />
          </Field>
        </div>

        {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">{error}</p>}
        {saved && <p className="text-green-700 text-sm bg-green-50 px-4 py-3 rounded-lg">SEO settings saved for {page.label}!</p>}
      </div>
    </div>
  );
}

// ─── Products SEO Tab ─────────────────────────────────────────────────────────

function ProductsSeoTab({ token }: { token: string | null }) {
  const [products, setProducts] = useState<ProductSeoItem[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/admin/products?limit=100`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        const list: any[] = Array.isArray(data.data) ? data.data : data.data?.products ?? [];
        setProducts(list.map(p => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          metaTitle: p.metaTitle ?? '',
          metaDescription: p.metaDescription ?? '',
          focusKeywords: p.focusKeywords ?? '',
        })));
        if (list.length) setSelected(list[0].id);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const product = products.find(p => p.id === selected);

  const setField = (key: keyof Omit<ProductSeoItem, 'id' | 'name' | 'slug'>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setProducts(prev => prev.map(p => p.id === selected ? { ...p, [key]: e.target.value } : p));

  const handleSave = async () => {
    if (!product) return;
    setSaving(true); setError(''); setSaved(false);
    try {
      const res = await fetch(`${API_URL}/admin/products/${product.id}/seo`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          metaTitle: product.metaTitle,
          metaDescription: product.metaDescription,
          focusKeywords: product.focusKeywords,
        }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>;

  return (
    <div className="flex gap-6">
      {/* Left: Product List */}
      <div className="w-64 flex-shrink-0 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden max-h-[500px] overflow-y-auto">
          {filtered.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No products found</p>}
          {filtered.map(p => (
            <button
              key={p.id}
              onClick={() => { setSelected(p.id); setSaved(false); setError(''); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-b border-gray-50 last:border-b-0 text-left ${
                selected === p.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Package className="w-4 h-4 flex-shrink-0 text-gray-300" />
              <span className="truncate">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right: SEO Form */}
      {product ? (
        <div className="flex-1 min-w-0 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-400 mt-0.5">/products/{product.slug}</p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
          </div>

          <GooglePreview
            title={product.metaTitle || product.name}
            description={product.metaDescription}
            url={`mattressfactory.in/products/${product.slug}`}
          />

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <h3 className="font-semibold text-gray-800">Meta Tags</h3>
            </div>

            <Field label="Meta Title" hint={`${product.metaTitle.length}/60 chars`}>
              <input type="text" value={product.metaTitle} onChange={setField('metaTitle')}
                className={INPUT} placeholder={`${product.name} | Mattress Factory`} />
            </Field>

            <Field label="Meta Description" hint={`${product.metaDescription.length}/160 chars`}>
              <textarea value={product.metaDescription} onChange={setField('metaDescription')}
                rows={3} className={INPUT} placeholder="Describe this product in 1-2 sentences..." />
            </Field>

            <Field label="Focus Keywords" hint="Comma-separated">
              <input type="text" value={product.focusKeywords} onChange={setField('focusKeywords')}
                className={INPUT} placeholder="mattress, memory foam, ortho" />
            </Field>
          </div>

          {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">{error}</p>}
          {saved && <p className="text-green-700 text-sm bg-green-50 px-4 py-3 rounded-lg">SEO updated for {product.name}!</p>}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">Select a product to edit its SEO</div>
      )}
    </div>
  );
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

const INPUT = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none';

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function SaveBtn({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={saving}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60"
    >
      {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
      {saving ? 'Saving...' : 'Save Settings'}
    </button>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function SeoPage() {
  const { token } = useAuthStore();
  const [tab, setTab] = useState<Tab>('global');

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'global',   label: 'Global SEO',   icon: <Globe className="w-4 h-4" /> },
    { key: 'page',     label: 'Page SEO',      icon: <FileText className="w-4 h-4" /> },
    { key: 'products', label: 'Products SEO',  icon: <Package className="w-4 h-4" /> },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">SEO Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage SEO for your entire site, individual pages, and products</p>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              tab === t.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'global'   && <GlobalSeoTab   token={token} />}
      {tab === 'page'     && <PageSeoTab     token={token} />}
      {tab === 'products' && <ProductsSeoTab token={token} />}
    </div>
  );
}
