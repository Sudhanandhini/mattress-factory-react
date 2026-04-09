import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Shield, Truck, Heart, ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus, Share2, Wrench, CheckCircle, Phone } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore, useWishlistStore } from '@/store/useStore';
import toast from 'react-hot-toast';

const STATIC_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');
function resolveImg(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STATIC_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Variant { id: string; sizeGroup?: string; size?: string; thickness?: string; firmness?: string; price: number; salePrice?: number | null; stock?: number; isActive?: boolean; label?: string; }
interface ProductImage { id: string; url: string; altText?: string; isPrimary: boolean; }
interface Product {
  id: string; name: string; slug: string; shortDescription?: string; description?: string;
  basePrice: number; discountPrice: number; discountPercent: number;
  brand?: string; material?: string; warranty?: string;
  offers?: string[];
  images: ProductImage[]; variants: Variant[]; avgRating?: number; reviewCount?: number;
  specifications?: { label: string; value: string }[];
  freebies?: { name: string; image?: string }[];
  categories?: { id: string; name: string; slug: string }[];
}

function parseShortDescLines(html: string): { thickness: string[]; offers: string[] } {
  const cleaned = cleanHtml(html);
  const text = cleaned.replace(/<[^>]+>/g, '\n');
  const lines = text.split(/\n/).map(l => l.replace(/&[a-z#0-9]+;/gi, ' ').trim()).filter(Boolean);
  const thickness = lines.filter(l => /THICKNESS\s*[=:]/i.test(l));
  const offers = lines
    .filter(l => /flat\s+\d+%/i.test(l))
    .map(l => l
      .replace(/will be applied in cart page/gi, '')
      .replace(/in cart page/gi, '')
      .replace(/\.\s*$/, '')
      .trim()
    );
  return { thickness, offers };
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

function cleanHtml(str?: string): string {
  if (!str) return '';

  // Unescape escaped characters
  let html = str.replace(/\\n/g, '\n').replace(/\\t/g, '');
  html = html.replace(/\[[^\]]*\]/g, '');
  html = html.replace(/&nbsp;/gi, ' ');

  // Strip ALL inline styles (main cause of big blank spaces)
  html = html.replace(/\s+style\s*=\s*"[^"]*"/gi, '');
  html = html.replace(/\s+style\s*=\s*'[^']*'/gi, '');
  // Strip layout-breaking HTML attributes
  html = html.replace(/\s+(width|height|align|valign|bgcolor|background|cellpadding|cellspacing|border)\s*=\s*["'][^"']*["']/gi, '');

  // Use DOMParser for proper structural cleaning (removes truly empty nodes)
  if (typeof document !== 'undefined') {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Remove all <table> elements (embedded spec tables from rich-text editor)
    doc.body.querySelectorAll('table').forEach(t => t.remove());

    // Walk and remove elements that are visually empty (no text, no images)
    function pruneEmpty(el: Element) {
      Array.from(el.children).forEach(child => pruneEmpty(child));
      if (el === doc.body) return;
      const hasText = (el.textContent || '').trim().length > 0;
      const hasImg = el.querySelector('img') !== null;
      if (!hasText && !hasImg) el.remove();
    }
    pruneEmpty(doc.body);

    html = doc.body.innerHTML;
  }

  // Collapse excessive <br> runs (can remain after pruning)
  html = html.replace(/(<br\s*\/?>\s*){3,}/gi, '<br><br>');
  return html.trim();
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, openAuthModal } = useAuthStore();
  const { addItem: addToCart } = useCartStore();
  const { toggle: toggleWishlist, has: isInWishlist } = useWishlistStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [tempVariant, setTempVariant] = useState<Variant | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`${API_URL}/products/slug/${slug}`)
      .then(r => { if (!r.ok) throw new Error('Product not found'); return r.json(); })
      .then(data => {
        const p = data.data ?? data;
        const prod: Product = {
          ...p,
          basePrice: parseFloat(p.basePrice) || 0,
          discountPrice: p.discountPrice != null ? parseFloat(p.discountPrice) : parseFloat(p.basePrice) || 0,
          discountPercent: p.discountPercent ?? 0,
          avgRating: p.avgRating != null ? parseFloat(p.avgRating) : 0,
          reviewCount: p.reviewCount ?? 0,
          categories: (p.categories || []).map((c: any) => c.category ?? c),
          variants: (p.variants || []).map((v: any) => ({ ...v, price: parseFloat(v.price) || 0, salePrice: v.salePrice != null ? parseFloat(v.salePrice) : null })),
        };
        setProduct(prod);
        const active = prod.variants.filter(v => v.isActive !== false);
        if (active.length) setSelectedVariant(active[0]);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1a2a6c] border-t-transparent mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading product...</p>
      </div>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500 text-lg">Product not found.</p>
      <Link to="/products" className="text-[#1a2a6c] underline">Back to products</Link>
    </div>
  );

  const images = product.images?.length ? product.images : [];
  const activeVariants = product.variants.filter(v => v.isActive !== false);
  const price = selectedVariant ? (selectedVariant.salePrice ?? selectedVariant.price) : (product.discountPrice || product.basePrice);
  const originalPrice = selectedVariant ? selectedVariant.price : product.basePrice;
  const hasDiscount = price < originalPrice;
  const discountPct = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const savings = originalPrice - price;
  const isWishlisted = isInWishlist(product.id);
  const primaryImage = resolveImg(images.find(i => i.isPrimary)?.url || images[0]?.url);

  const handleAddToCart = () => {
    if (!user) { openAuthModal(); return; }
    if (activeVariants.length > 0 && !selectedVariant) { toast.error('Please select a size'); return; }
    addToCart({ productId: product.id, variantId: selectedVariant?.id || '', productName: product.name, productSlug: product.slug, imageUrl: primaryImage, variantLabel: selectedVariant?.label || selectedVariant?.size || '', price, quantity });
    toast.success('Added to cart!');
  };

  const handleOrderNow = () => {
    if (!user) { openAuthModal(); return; }
    if (activeVariants.length > 0 && !selectedVariant) { toast.error('Please select a size'); return; }
    addToCart({ productId: product.id, variantId: selectedVariant?.id || '', productName: product.name, productSlug: product.slug, imageUrl: primaryImage, variantLabel: selectedVariant?.label || selectedVariant?.size || '', price, quantity });
    navigate('/cart');
  };

  const handleWishlist = () => {
    if (!user) { openAuthModal(); return; }
    toggleWishlist({ productId: product.id, productName: product.name, productSlug: product.slug, imageUrl: primaryImage, price, salePrice: hasDiscount ? price : null });
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  /* ── Variant Modal helpers ── */
  const uniqueSizeGroups = [...new Set(activeVariants.map(v => v.sizeGroup || ''))].filter(Boolean);
  const uniqueSizes = [...new Set(activeVariants.map(v => v.size || v.label || ''))].filter(Boolean);
  const uniqueThicknesses = [...new Set(activeVariants.map(v => v.thickness || ''))].filter(Boolean);
  const tempSizeGroup = tempVariant?.sizeGroup || '';
  const tempSize = tempVariant?.size || tempVariant?.label || '';
  const tempThickness = tempVariant?.thickness || '';

  const pickTemp = (sg: string, sz: string, th: string) => {
    const exact = activeVariants.find(v =>
      (!sg || v.sizeGroup === sg) && (!sz || (v.size || v.label || '') === sz) && (!th || v.thickness === th)
    );
    const loose = activeVariants.find(v =>
      (!sg || v.sizeGroup === sg) && (!sz || (v.size || v.label || '') === sz)
    ) || activeVariants.find(v => (!sg || v.sizeGroup === sg));
    setTempVariant(exact || loose || tempVariant);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Variant Modal ── */}
      {variantModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4">
          <div className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Choose a Variant</h2>
              <button onClick={() => setVariantModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 text-lg font-bold transition-colors">×</button>
            </div>

            {/* Modal body */}
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
              {/* Product thumb */}
              <div className="flex items-center gap-3">
                {primaryImage && <img src={primaryImage} alt={product.name} className="w-14 h-14 object-cover rounded-xl border border-gray-100" />}
                <p className="text-sm font-semibold text-gray-800">{product.name}</p>
              </div>

              {/* Size Group */}
              {uniqueSizeGroups.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-3">Size Group</p>
                  <div className="flex flex-wrap gap-2">
                    {uniqueSizeGroups.map(sg => {
                      const isActive = tempSizeGroup === sg;
                      return (
                        <button key={sg} onClick={() => pickTemp(sg, tempSize, tempThickness)}
                          className={`px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${isActive ? 'bg-[#1a2a6c] text-white border-[#1a2a6c]' : 'border-gray-200 text-gray-700 hover:border-[#1a2a6c] hover:text-[#1a2a6c] bg-white'}`}>
                          {sg}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dimension / Size */}
              {uniqueSizes.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-3">Dimension</p>
                  <div className="flex flex-wrap gap-2">
                    {uniqueSizes.map(sz => {
                      const isActive = tempSize === sz;
                      return (
                        <button key={sz} onClick={() => pickTemp(tempSizeGroup, sz, tempThickness)}
                          className={`px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${isActive ? 'bg-[#1a2a6c] text-white border-[#1a2a6c]' : 'border-gray-200 text-gray-700 hover:border-[#1a2a6c] hover:text-[#1a2a6c] bg-white'}`}>
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Thickness */}
              {uniqueThicknesses.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-3">Thickness</p>
                  <div className="flex flex-wrap gap-2">
                    {uniqueThicknesses.map(th => {
                      const isActive = tempThickness === th;
                      return (
                        <button key={th} onClick={() => pickTemp(tempSizeGroup, tempSize, th)}
                          className={`px-5 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${isActive ? 'bg-[#1a2a6c] text-white border-[#1a2a6c]' : 'border-gray-200 text-gray-700 hover:border-[#1a2a6c] hover:text-[#1a2a6c] bg-white'}`}>
                          {th}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm button */}
            <div className="px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => { if (tempVariant) setSelectedVariant(tempVariant); setVariantModalOpen(false); }}
                className="w-full py-4 bg-[#1a2a6c] hover:bg-[#1a2a6c]/90 text-white rounded-xl font-bold text-base transition-all"
              >
                Confirm Variant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link to="/" className="hover:text-[#1a2a6c] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-[#1a2a6c] transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-800 font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ── LEFT: Image Gallery ── */}
            <div className="p-6 lg:p-8 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="flex gap-3 h-full">
                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex flex-col gap-2 w-16 flex-shrink-0">
                    {images.map((img, i) => (
                      <button
                        key={img.id}
                        onClick={() => setActiveImage(i)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                          activeImage === i ? 'border-[#1a2a6c] shadow-md' : 'border-white hover:border-gray-300 shadow-sm'
                        }`}
                      >
                        {!imgErrors[i] ? (
                          <img src={resolveImg(img.url)} alt="" className="w-full h-full object-cover"
                            onError={() => setImgErrors(p => ({ ...p, [i]: true }))} />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-lg">🛏</div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Image */}
                <div className="relative flex-1 min-h-[380px] lg:min-h-[500px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  {/* Discount Badge */}
                  {hasDiscount && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                        -{discountPct}% OFF
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <button onClick={handleWishlist}
                      className={`w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-all ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}>
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <button className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-[#1a2a6c]">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Main Image */}
                  {images[activeImage] && !imgErrors[activeImage] ? (
                    <img
                      src={resolveImg(images[activeImage].url)}
                      alt={images[activeImage].altText || product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={() => setImgErrors(p => ({ ...p, [activeImage]: true }))}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-200 text-8xl">🛏</div>
                  )}

                  {/* Nav Arrows */}
                  {images.length > 1 && (
                    <>
                      <button onClick={() => setActiveImage(i => (i - 1 + images.length) % images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all">
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                      </button>
                      <button onClick={() => setActiveImage(i => (i + 1) % images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all">
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </button>
                    </>
                  )}

                  {/* Dots */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button key={i} onClick={() => setActiveImage(i)}
                          className={`h-1.5 rounded-full transition-all ${i === activeImage ? 'w-4 bg-[#1a2a6c]' : 'w-1.5 bg-gray-300'}`} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Freebies */}
              {product.freebies?.length ? (
                <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-xl">
                  <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-3">🎁 Free Gifts Included</p>
                  <div className="flex flex-wrap gap-2">
                    {product.freebies.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white border border-green-100 rounded-lg px-3 py-2 shadow-sm">
                        {f.image && <img src={f.image} alt={f.name} className="w-7 h-7 object-cover rounded" />}
                        <span className="text-xs font-semibold text-green-800">{f.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* ── RIGHT: Product Info ── */}
            <div className="p-6 lg:p-8 flex flex-col gap-5">

              {/* Name */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">{product.name}</h1>
              </div>

              {/* Discount Banner */}
              {hasDiscount && (
                <div className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-600 text-sm">🔥</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-800">Limited Time Offer!</p>
                    <p className="text-xs text-amber-600">Save {discountPct}% — {formatCurrency(savings)} off today only</p>
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-black text-[#1a2a6c]">{formatCurrency(price)}</span>
                  {hasDiscount && (
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-gray-400 line-through">{formatCurrency(originalPrice)}</span>
                      <span className="bg-green-100 text-green-700 text-sm font-bold px-2.5 py-0.5 rounded-full">{discountPct}% off</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes</p>
                {hasDiscount && (
                  <p className="text-sm font-semibold text-green-600 mt-1">✓ You save {formatCurrency(savings)}</p>
                )}
              </div>

              {/* Variants — Choose Size button */}
              {activeVariants.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Choose Size</p>
                  <button
                    onClick={() => { setTempVariant(selectedVariant); setVariantModalOpen(true); }}
                    className="w-full flex items-center justify-between px-4 py-3 border-2 border-[#1a2a6c] rounded-xl bg-white hover:bg-[#1a2a6c]/5 transition-all"
                  >
                    <span className="text-sm font-semibold text-[#1a2a6c]">
                      {selectedVariant
                        ? [
                            selectedVariant.sizeGroup,
                            selectedVariant.size || selectedVariant.label,
                            selectedVariant.thickness ? `${selectedVariant.thickness} inch` : null,
                            selectedVariant.firmness,
                          ].filter(Boolean).join(' | ')
                        : 'Select a size'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#1a2a6c]" />
                  </button>
                </div>
              )}

              {/* Thickness + Offer lines — from DB or fallback-parsed */}
              {(() => {
                // Prefer data from DB offers field; fall back to parsing shortDescription
                const dbOffers = Array.isArray(product.offers) && product.offers.length ? product.offers : null;
                const { thickness, offers: parsedOffers } = product.shortDescription
                  ? parseShortDescLines(product.shortDescription)
                  : { thickness: [], offers: [] };

                // Thickness from selected variant
                const thicknessLine = selectedVariant?.thickness
                  ? [`THICKNESS = ${selectedVariant.thickness} INCH`]
                  : thickness;

                const offerLines = dbOffers ?? parsedOffers;
                if (!thicknessLine.length && !offerLines.length) return null;

                return (
                  <div className="space-y-2">
                    {thicknessLine.map((t, i) => (
                      <div key={i} className="flex items-center gap-3 bg-[#1a2a6c]/5 border border-[#1a2a6c]/20 rounded-xl px-4 py-3">
                        <span className="text-xl">📐</span>
                        <span className="text-[#1a2a6c] font-bold text-sm tracking-wide">{t}</span>
                      </div>
                    ))}
                    {offerLines.map((o, i) => (
                      <div key={i} className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                        <span className="text-green-600 font-extrabold text-base mt-0.5">%</span>
                        <span className="text-green-800 text-sm font-medium leading-snug">{o}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* Quantity + Actions */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-600">Quantity:</span>
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold border-x-2 border-gray-200 h-10 flex items-center justify-center">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
{/* 
                <button onClick={handleOrderNow}
                  className="w-full py-3.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                  <Phone className="w-4 h-4" /> Order Now
                </button> */}

                {/* <button onClick={handleAddToCart}
                  className="w-full py-3.5 bg-white border-2 border-[#1a2a6c] text-[#1a2a6c] hover:bg-[#1a2a6c] hover:text-white rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button> */}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Shield, label: product.warranty || '10-Year', sub: 'Warranty' },
                  { icon: Truck, label: 'Free', sub: 'Delivery' },
                  { icon: Wrench, label: 'Free', sub: 'Customisation' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={sub} className="flex flex-col items-center gap-1.5 text-center py-3 px-2 bg-[#1a2a6c]/5 rounded-xl border border-[#1a2a6c]/10">
                    <div className="w-8 h-8 bg-[#1a2a6c]/10 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#1a2a6c]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1a2a6c] leading-tight">{label}</p>
                      <p className="text-[11px] text-gray-500 leading-tight">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features checklist */}
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  'Premium Quality Materials',
                  'Orthopaedic Support',
                  'Certified Safe & Hygienic',
                  'Easy Returns & Exchanges',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <span className="text-xs text-gray-600">{f}</span>
                  </div>
                ))}
              </div>

              {/* Brand / Material */}
              {(product.brand || product.material) && (
                <div className="flex flex-wrap gap-3 pt-1 border-t border-gray-100 text-xs text-gray-500">
                  {product.brand && (
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      <strong className="text-gray-600">Brand:</strong> {product.brand}
                    </span>
                  )}
                  {product.material && (
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      <strong className="text-gray-600">Material:</strong> {product.material}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tab Bar */}
          <div className="flex border-b border-gray-100 bg-gray-50">
            {([
              { key: 'description', label: 'Description' },
              { key: 'specs', label: `Specifications${product.specifications?.length ? ` (${product.specifications.length})` : ''}` },
            ] as { key: typeof activeTab; label: string }[]).map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-6 py-4 text-sm font-semibold transition-all border-b-2 -mb-px relative ${
                  activeTab === t.key
                    ? 'border-[#1a2a6c] text-[#1a2a6c] bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/60'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6 lg:p-8">
            {/* Description */}
            {activeTab === 'description' && (() => {
              const html = cleanHtml(product.description || product.shortDescription);
              return html
                ? <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_strong]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_*:empty]:hidden [&_br+br+br]:hidden" dangerouslySetInnerHTML={{ __html: html }} />
                : <p className="text-gray-400 text-sm text-center py-8">No description available for this product.</p>;
            })()}

            {/* Specifications */}
            {activeTab === 'specs' && (
              product.specifications?.length ? (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#1a2a6c]">
                        <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest w-2/5">Specification</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-widest">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.specifications.map((spec, i) => (
                        <tr key={i} className={`border-t border-gray-100 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50/30`}>
                          <td className="px-6 py-3.5 font-semibold text-gray-500 uppercase tracking-wide text-xs">{spec.label}</td>
                          <td className="px-6 py-3.5 text-gray-800 text-sm">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-400 text-sm text-center py-8">No specifications available.</p>
              )
            )}

          </div>
        </div>

        {/* Back link */}
        <div className="mt-4">
          <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#1a2a6c] transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
