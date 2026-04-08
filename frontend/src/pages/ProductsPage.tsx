import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ArrowRight, Eye, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore, useWishlistStore } from '@/store/useStore';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_BASE = API_URL.replace('/api', '');

function resolveImg(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  basePrice: number;
  discountPrice: number;
  discountPercent: number;
  images?: { url: string; isPrimary: boolean }[];
  variants?: { id: string; price: number; salePrice?: number; label?: string; size?: string; sizeGroup?: string; isActive?: boolean }[];
  avgRating?: number;
  reviewCount?: number;
  category?: string;
  categories?: { id: string; name: string; slug: string }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: { products: number };
}

const SORT_OPTIONS = [
  { label: 'Popularity', value: 'popular' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Best Rated', value: 'rating' },
];

const SIZE_OPTIONS = ['Single', 'Double', 'Queen', 'King', 'Super King'];

const PRICE_RANGES = [
  { label: 'All Prices', min: '', max: '' },
  { label: 'Under ₹10,000', min: '', max: '10000' },
  { label: '₹10,000 - ₹20,000', min: '10000', max: '20000' },
  { label: '₹20,000 - ₹40,000', min: '20000', max: '40000' },
  { label: '₹40,000 - ₹60,000', min: '40000', max: '60000' },
  { label: '₹60,000+', min: '60000', max: '' },
];

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

function stripHtml(html: string) {
  return html
    .replace(/\\n/g, ' ')          // literal \n escape sequences
    .replace(/\[[^\]]*\]/g, '')     // [wp-shortcodes]
    .replace(/&nbsp;/g, ' ')        // &nbsp; entities
    .replace(/<[^>]*>/g, ' ')       // HTML tags
    .replace(/\s+/g, ' ')
    .trim();
}

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3"
      >
        <span className="text-sm font-bold text-gray-800 uppercase tracking-wide">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && children}
    </div>
  );
}

function ProductCardItem({ product, index = 0 }: { product: Product; index?: number }) {
  const { isLoggedIn, openAuthModal } = useAuthStore();
  const addToCart = useCartStore(s => s.addItem);
  const { toggle: toggleWishlist, has: inWishlist } = useWishlistStore();

  const [imgError, setImgError] = useState(false);
  const imgUrl = resolveImg(product.images?.find(i => i.isPrimary)?.url || product.images?.[0]?.url);
  const isWishlisted = inWishlist(product.id);
  const categoryLabel = product.category || product.categories?.[0]?.name || 'Mattress';

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn()) { openAuthModal(); return; }
    toggleWishlist({ productId: product.id, productName: product.name, productSlug: product.slug, imageUrl: imgUrl, price: product.basePrice, salePrice: product.discountPrice !== product.basePrice ? product.discountPrice : null });
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn()) { openAuthModal(); return; }
    const variant = (product.variants || []).filter(v => v.isActive !== false)[0];
    addToCart({ productId: product.id, variantId: variant?.id || product.id, productName: product.name, productSlug: product.slug, imageUrl: imgUrl, variantLabel: variant?.label || variant?.size || 'Standard', price: product.discountPrice, quantity: 1 });
    toast.success('Added to cart');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
      {/* Image */}
      <Link to={`/products/${product.slug}`} className="block relative">
        <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
          {imgUrl && !imgError ? (
            <img src={imgUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={() => setImgError(true)} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl text-gray-200">🛏</div>
          )}
          {/* Category badge */}
          <span className="absolute top-2 left-2 bg-[#1a2a6c] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
            {categoryLabel}
          </span>
          {/* Discount badge */}
          {product.discountPercent > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
              -{product.discountPercent}%
            </span>
          )}
          {/* Action icons */}
          <div className="absolute bottom-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={handleWishlist} className={`w-8 h-8 rounded-full flex items-center justify-center shadow transition-colors ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'}`}>
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button onClick={handleAddToCart} className="w-8 h-8 rounded-full bg-white text-gray-600 hover:bg-[#1a2a6c] hover:text-white flex items-center justify-center shadow transition-colors">
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] font-bold text-[#1a2a6c] uppercase tracking-widest mb-1">{categoryLabel}</p>
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-bold text-gray-800 text-sm leading-snug mb-1.5 line-clamp-2 hover:text-[#1a2a6c] transition-colors">
            {product.name}
          </h3>
        </Link>
        {product.shortDescription && (
          <p className="text-xs text-gray-500 mb-2 line-clamp-2 leading-relaxed">
            {stripHtml(product.shortDescription)}
          </p>
        )}

        {/* Rating */}
        {product.avgRating ? (
          <div className="flex items-center gap-1 mb-2">
            {[1,2,3,4,5].map(n => (
              <Star key={n} className={`w-3 h-3 ${n <= Math.round(product.avgRating!) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}`} />
            ))}
            {product.reviewCount ? <span className="text-[10px] text-gray-400 ml-1">({product.reviewCount})</span> : null}
          </div>
        ) : null}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-bold text-gray-900">{formatCurrency(product.discountPrice)}</span>
          {product.discountPercent > 0 && (
            <span className="text-xs text-gray-400 line-through">{formatCurrency(product.basePrice)}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link to={`/products/${product.slug}`} className="flex items-center gap-1 text-xs font-semibold text-[#1a2a6c] hover:underline">
            View Details <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            to={`/products/${product.slug}`}
            className="ml-auto flex items-center gap-1 bg-[#1a2a6c] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#092f75] transition-colors"
          >
            <Eye className="w-3 h-3" /> View
          </Link>
        </div>
      </div>
    </div>
  );
}

const LIMIT = 100;

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'popular';
  const size = searchParams.get('size') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const totalPages = Math.ceil(total / LIMIT);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then(r => r.json())
      .then(data => setCategories(Array.isArray(data) ? data : data.data ?? data.categories ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (sort) params.set('sort', sort);
    if (size) params.set('size', size);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    params.set('page', String(page));
    params.set('limit', String(LIMIT));

    fetch(`${API_URL}/products?${params}`)
      .then(r => r.json())
      .then(data => {
        const raw: any[] = Array.isArray(data) ? data : data.data?.products ?? data.products ?? [];
        setTotal(data.data?.pagination?.totalItems ?? data.total ?? raw.length);
        const list = raw.map((p: any) => {
          // Prisma Decimal fields come as strings; fall back to lowest variant price if 0
          let basePrice = parseFloat(p.basePrice) || 0;
          let discountPrice = p.discountPrice != null ? parseFloat(p.discountPrice) : basePrice;

          // If product-level prices are 0, use the cheapest active variant price
          if (basePrice === 0 && p.variants?.length) {
            const activeVariants = p.variants.filter((v: any) => v.isActive !== false);
            if (activeVariants.length) {
              const prices = activeVariants.map((v: any) => parseFloat(v.price) || 0).filter((n: number) => n > 0);
              const salePrices = activeVariants.map((v: any) => v.salePrice != null ? parseFloat(v.salePrice) : null).filter((n: any) => n != null && n > 0);
              if (prices.length) basePrice = Math.min(...prices);
              if (salePrices.length) discountPrice = Math.min(...salePrices as number[]);
              else discountPrice = basePrice;
            }
          }

          const discountPercent = basePrice > discountPrice && discountPrice > 0
            ? Math.round(((basePrice - discountPrice) / basePrice) * 100)
            : (p.discountPercent || 0);
          const cats = (p.categories || []).map((c: any) => c.category ?? c).filter(Boolean);
          return { ...p, basePrice, discountPrice, discountPercent, categories: cats, category: cats[0]?.name || p.category };
        });
        setProducts(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, category, sort, size, minPrice, maxPrice, page]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    next.set('page', '1');
    setSearchParams(next);
  };

  const setPage = (p: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(p));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedPriceRange = PRICE_RANGES.find(r => r.min === minPrice && r.max === maxPrice) ?? PRICE_RANGES[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* ── SIDEBAR ── */}
          <aside className="w-56 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-24">

              {/* Results count */}
              <p className="text-xs text-gray-500 mb-5">
                Showing <span className="font-semibold text-gray-800">{products.length}</span> of{' '}
                <span className="font-semibold text-gray-800">{total}</span> results
              </p>

              {/* Categories */}
              <FilterSection title="Categories">
                <div className="space-y-1.5">
                  <label
                    onClick={() => setParam('category', '')}
                    className={`flex items-center justify-between cursor-pointer px-2 py-1.5 rounded-lg text-sm transition-colors ${!category ? 'bg-[#1a2a6c] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span>All</span>
                  </label>
                  {categories.map(cat => (
                    <label
                      key={cat.id}
                      onClick={() => setParam('category', cat.slug)}
                      className={`flex items-center justify-between cursor-pointer px-2 py-1.5 rounded-lg text-sm transition-colors ${category === cat.slug ? 'bg-[#1a2a6c] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <span>{cat.name}</span>
                      {cat._count?.products != null && (
                        <span className={`text-xs ${category === cat.slug ? 'text-white/70' : 'text-gray-400'}`}>{cat._count.products}</span>
                      )}
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Size */}
              <FilterSection title="Size">
                <div className="space-y-1.5">
                  {SIZE_OPTIONS.map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                      <input
                        type="radio"
                        name="size"
                        value={s}
                        checked={size === s}
                        onChange={() => setParam('size', size === s ? '' : s)}
                        className="accent-[#1a2a6c]"
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Price Range */}
              <FilterSection title="Price Range">
                <div className="space-y-1.5">
                  {PRICE_RANGES.map(r => (
                    <label
                      key={r.label}
                      onClick={() => { setParam('minPrice', r.min); setParam('maxPrice', r.max); }}
                      className={`flex items-center cursor-pointer px-2 py-1.5 rounded-lg text-sm transition-colors ${selectedPriceRange.label === r.label ? 'bg-[#1a2a6c] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {r.label}
                    </label>
                  ))}
                </div>
              </FilterSection>
            </div>
          </aside>

          {/* ── MAIN ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-800">{products.length}</span> of <span className="font-semibold text-gray-800">{total}</span> results
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  defaultValue={search}
                  onKeyDown={e => { if (e.key === 'Enter') setParam('search', (e.target as HTMLInputElement).value); }}
                  className="hidden md:block text-sm border border-gray-200 rounded-lg px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]/20"
                />
                <select
                  value={sort}
                  onChange={e => setParam('sort', e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none"
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 h-80 animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 text-gray-400">
                <p className="text-5xl mb-4">🛏</p>
                <p className="font-medium text-lg">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map((p, i) => <ProductCardItem key={p.id} product={p} index={i} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-full text-sm font-semibold transition-colors ${
                      p === page
                        ? 'bg-[#1a2a6c] text-white'
                        : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
