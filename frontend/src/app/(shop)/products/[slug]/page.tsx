'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, Star, ShieldCheck, Truck,
  Settings2, Gift, CheckCircle2, Phone,
} from 'lucide-react';
import { productApi } from '@/lib/api/client';

// ── Types ──────────────────────────────────────────────────────────────────
interface Variant {
  id: string;
  sizeGroup: string | null;
  size: string;
  thickness: string | null;
  firmness: string | null;
  price: string | number;
  salePrice: string | number | null;
  inStock: boolean;
}
interface Spec    { label: string; value: string; sortOrder: number }
interface Badge   { title: string; icon: string | null }
interface Freebie { name: string; image: string | null }
interface PImage  { url: string; isPrimary: boolean; altText: string | null }

interface Product {
  id: string; name: string; slug: string; type: string;
  description: string | null; shortDescription: string | null;
  brand: string | null; warranty: string | null;
  sizeGroups: string | null; dimensions: string | null; firmness: string | null;
  avgRating: number; reviewCount: number; inStock: boolean;
  categories: { category: { id: string; name: string; slug: string } }[];
  images: PImage[];
  variants: Variant[];
  specifications: Spec[];
  badges: Badge[];
  freebies: Freebie[];
}

// ── Helpers ────────────────────────────────────────────────────────────────
const BADGE_ICONS: Record<string, React.ReactNode> = {
  Shield:   <ShieldCheck className="w-5 h-5" />,
  Truck:    <Truck className="w-5 h-5" />,
  Settings: <Settings2 className="w-5 h-5" />,
};

/** Strip WC spec table, h1, shortcodes, literal \n from description */
function cleanDesc(html: string): string {
  return html
    .replace(/<table[\s\S]*?<\/table>/gi, '')
    .replace(/<h1[\s\S]*?<\/h1>/gi, '')
    .replace(/\\n/g, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .trim();
}

/** Strip WC shortcodes, literal \n, bootstrap grid divs from shortDescription */
function cleanShortDesc(html: string): string {
  return html
    .replace(/\\n/g, ' ')                          // literal \n → space
    .replace(/\[[^\]]*\]/g, '')                    // [ht-ctc-chat] etc.
    .replace(/<div[^>]*class="[^"]*(?:row|col)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '') // grid divs
    .replace(/<div>\s*<\/div>/gi, '')              // empty divs
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Returns true if string looks like a dimension e.g. "72x60" or "72×60" */
function isDimension(s: string): boolean {
  return /^\d+\s*[x×]\s*\d+$/i.test(s.trim());
}

function StarRow({ rating, size = 4 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct]         = useState<Product | null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [selectedGroup, setGroup]     = useState('');
  const [selectedSize, setSize]       = useState('');
  const [activeImg, setActiveImg]     = useState(0);
  const [tab, setTab]                 = useState<'desc' | 'specs' | 'reviews'>('desc');

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const res  = await productApi.getBySlug(slug);
        const data: Product = res.data || res;
        setProduct(data);
        if (data.variants?.length) {
          setGroup(data.variants[0].sizeGroup || '');
          setSize(data.variants[0].size);
        }
      } catch {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !product) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <p className="text-red-500 text-lg">{error || 'Product not found.'}</p>
      <Link href="/products" className="text-accent-500 underline text-sm">Back to Products</Link>
    </div>
  );

  // ── Derived ───────────────────────────────────────────────────────────────
  const catName  = product.categories?.[0]?.category?.name || 'Mattress';
  const catSlug  = product.categories?.[0]?.category?.slug || '';
  const groups   = Array.from(new Set(product.variants.map(v => v.sizeGroup || 'Standard')));

  // If all sizeGroups look like dimensions (72x60), treat them as sizes — skip the group selector
  const useGroupSelector = groups.length > 1 && groups.some(g => g !== 'Standard' && !isDimension(g));

  const sizes    = useGroupSelector
    ? product.variants.filter(v => (v.sizeGroup || 'Standard') === selectedGroup).map(v => v.size)
    : product.variants.map(v => v.size);   // flat size list when no real group

  const variant  = product.variants.find(
    v => (v.sizeGroup || 'Standard') === selectedGroup && v.size === selectedSize
  ) ?? product.variants[0];

  const regular  = parseFloat(String(variant?.price ?? 0));
  const sale     = variant?.salePrice ? parseFloat(String(variant.salePrice)) : regular;
  const discPct  = regular > sale ? Math.round(((regular - sale) / regular) * 100) : 0;

  const images   = product.images?.length
    ? product.images
    : [{ url: '', isPrimary: true, altText: product.name }];

  const handleGroup = (g: string) => {
    setGroup(g);
    setSize(product.variants.find(v => (v.sizeGroup || 'Standard') === g)?.size ?? '');
  };

  const tabs = [
    { key: 'desc',    label: 'Description' },
    { key: 'specs',   label: `Specifications (${product.specifications?.length ?? 0})` },
    { key: 'reviews', label: `Reviews (${product.reviewCount})` },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Breadcrumb ─────────────────────────────────── */}
      <div className="bg-navy-700 py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
            <Link href="/"        className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/products?category=${catSlug}`} className="hover:text-white transition-colors">{catName}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium truncate max-w-[180px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Main Grid ──────────────────────────────────── */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT – Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="p-6 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col gap-4"
            >
              {/* Main Image */}
              <div className="relative rounded-xl overflow-hidden bg-gray-50 aspect-[4/3] border border-gray-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImg}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                  >
                    {images[activeImg]?.url ? (
                      <img
                        src={images[activeImg].url}
                        alt={images[activeImg].altText || product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-8xl">🛏️</div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {discPct > 0 && (
                  <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    -{discPct}% OFF
                  </span>
                )}
                {!product.inStock && (
                  <span className="absolute top-3 right-3 bg-gray-700 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition"
                    >
                      <ChevronLeft className="w-4 h-4 text-navy-700" />
                    </button>
                    <button
                      onClick={() => setActiveImg(i => (i + 1) % images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition"
                    >
                      <ChevronRight className="w-4 h-4 text-navy-700" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImg === i
                          ? 'border-accent-500 ring-2 ring-accent-200'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {img.url
                        ? <img src={img.url} alt="" className="w-full h-full object-cover" />
                        : <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xl">🛏️</div>
                      }
                    </button>
                  ))}
                </div>
              )}

              {/* Freebies */}
              {product.freebies?.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
                    <Gift className="w-4 h-4" /> FREE with this product:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.freebies.map((f, i) => (
                      <span key={i} className="text-xs bg-white text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-medium">
                        🎁 {f.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* RIGHT – Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="p-6 lg:p-8 flex flex-col gap-5"
            >
              {/* Category badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold bg-accent-50 text-accent-600 border border-accent-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  {catName}
                </span>
                {product.brand && (
                  <span className="text-xs text-gray-400 border border-gray-200 px-3 py-1 rounded-full">{product.brand}</span>
                )}
              </div>

              {/* Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-navy-700 leading-snug">
                {product.name}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-3">
                <StarRow rating={product.avgRating} size={16} />
                <span className="text-sm text-gray-500">{Number(product.avgRating).toFixed(1)} ({product.reviewCount} reviews)</span>
                <span className={`ml-auto text-xs font-semibold flex items-center gap-1 ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <hr className="border-gray-100" />

              {/* Price */}
              <div className="flex items-end gap-3">
                <span className="text-4xl font-extrabold text-navy-700">
                  ₹{Math.round(sale).toLocaleString('en-IN')}
                </span>
                {discPct > 0 && (
                  <>
                    <span className="text-xl text-gray-400 line-through mb-0.5">
                      ₹{Math.round(regular).toLocaleString('en-IN')}
                    </span>
                    <span className="mb-1 text-sm font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                      Save {discPct}%
                    </span>
                  </>
                )}
              </div>

              {/* Short description – cleaned of \n and WC shortcodes */}
              {product.shortDescription && (() => {
                const clean = cleanShortDesc(product.shortDescription);
                const textOnly = clean.replace(/<[^>]+>/g, '').trim();
                if (!textOnly) return null;
                return (
                  <div
                    className="text-sm text-gray-500 leading-relaxed [&_strong]:font-semibold [&_strong]:text-navy-700 [&_span]:text-inherit"
                    dangerouslySetInnerHTML={{ __html: clean }}
                  />
                );
              })()}

              <hr className="border-gray-100" />

              {/* Size Group selector — only show when groups are King/Queen style */}
              {useGroupSelector && (
                <div>
                  <p className="text-sm font-semibold text-navy-700 mb-2.5">
                    Size: <span className="text-accent-500 font-bold">{selectedGroup}</span>
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {groups.map(g => (
                      <button
                        key={g}
                        onClick={() => handleGroup(g)}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                          selectedGroup === g
                            ? 'bg-accent-500 text-white border-accent-500 shadow-md'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-accent-300 hover:text-accent-600'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions selector */}
              {sizes.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-navy-700 mb-2.5">
                    {useGroupSelector ? 'Dimensions (L×W inches):' : 'Select Size (L×W inches):'}{' '}
                    <span className="text-navy-500 font-bold">{selectedSize}</span>
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                          selectedSize === s
                            ? 'bg-navy-700 text-white border-navy-700 shadow-md'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-navy-400 hover:text-navy-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Firmness */}
              {product.firmness && (
                <div>
                  <p className="text-sm font-semibold text-navy-700 mb-2">Firmness:</p>
                  <div className="flex gap-2 flex-wrap">
                    {product.firmness.split(',').map(f => (
                      <span key={f.trim()} className="px-4 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
                        {f.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Warranty quick info */}
              {product.warranty && (
                <div className="flex items-center gap-2 text-sm text-navy-700 bg-navy-50 border border-navy-100 rounded-lg px-4 py-2.5">
                  <ShieldCheck className="w-4 h-4 text-navy-500 flex-shrink-0" />
                  <span><strong>{product.warranty}</strong> Warranty Included</span>
                </div>
              )}

              {/* CTA */}
              <div className="flex gap-3 pt-1">
                <Link href="/contact" className="flex-1">
                  <button className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg text-base flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> Get Quote
                  </button>
                </Link>
              </div>

              {/* Trust badges */}
              {product.badges?.length > 0 && (
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {product.badges.map((badge, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-1.5 bg-gray-50 border border-gray-100 rounded-xl p-3">
                      <span className="text-navy-600">
                        {BADGE_ICONS[badge.icon || ''] ?? <ShieldCheck className="w-5 h-5" />}
                      </span>
                      <span className="text-xs font-medium text-navy-700 leading-tight">{badge.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* ── Tabs Section ──────────────────────────────── */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tab Bar */}
          <div className="flex border-b border-gray-100">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  tab === t.key
                    ? 'border-accent-500 text-accent-600 bg-accent-50/50'
                    : 'border-transparent text-gray-500 hover:text-navy-700 hover:bg-gray-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {tab === 'desc' && (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                >
                  {product.description ? (
                    <div
                      className="text-gray-600 leading-relaxed text-sm space-y-3 [&_strong]:font-semibold [&_strong]:text-navy-700 [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-navy-700 [&_h5]:text-sm [&_h5]:font-semibold [&_h5]:text-gray-700 [&_p]:leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: cleanDesc(product.description) }}
                    />
                  ) : (
                    <p className="text-gray-400">No description available.</p>
                  )}
                </motion.div>
              )}

              {tab === 'specs' && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                >
                  {product.specifications?.length > 0 ? (
                    <div className="overflow-hidden rounded-xl border border-gray-100">
                      {/* Header */}
                      <div className="grid grid-cols-2 bg-navy-700 text-white text-sm font-bold">
                        <div className="px-5 py-3">DESCRIPTION</div>
                        <div className="px-5 py-3 border-l border-navy-600">SPECIFICATION</div>
                      </div>
                      {product.specifications.map((spec, i) => (
                        <div
                          key={i}
                          className={`grid grid-cols-2 text-sm border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                        >
                          <div className="px-5 py-3 font-semibold text-navy-700 uppercase text-xs tracking-wide border-r border-gray-100">
                            {spec.label}
                          </div>
                          <div className="px-5 py-3 text-gray-700 uppercase text-xs tracking-wide">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No specifications available.</p>
                  )}
                </motion.div>
              )}

              {tab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                >
                  <div className="flex items-center gap-6 mb-6 p-5 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-center">
                      <div className="text-5xl font-extrabold text-navy-700">{Number(product.avgRating).toFixed(1)}</div>
                      <StarRow rating={product.avgRating} size={18} />
                      <p className="text-xs text-gray-400 mt-1">{product.reviewCount} reviews</p>
                    </div>
                    <div className="w-px h-16 bg-gray-200" />
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {product.reviewCount === 0
                        ? 'No reviews yet. Be the first to share your experience with this product.'
                        : `Based on ${product.reviewCount} customer review${product.reviewCount > 1 ? 's' : ''}.`}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-6">
          <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-accent-500 hover:text-accent-600 font-medium transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
