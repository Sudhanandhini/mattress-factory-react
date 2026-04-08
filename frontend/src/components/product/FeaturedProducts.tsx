import { useState, useEffect, useRef, useCallback } from 'react';
import { ProductCard } from './ProductCard';
import { productApi } from '@/lib/api/client';

const VISIBLE = 4;
const GAP     = 24;   // px
const AUTO_MS = 2500;
const POLL_MS = 60000;

export function FeaturedProducts() {
  const [products, setProducts]             = useState<any[]>([]);
  const [loading, setLoading]               = useState(true);
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [transitioning, setTransitioning]   = useState(false);

  const wrapperRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const pausedRef   = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Fetch ALL products ──────────────────────────────────────────────────
  const fetchProducts = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const response = await productApi.getAll({ limit: 200 } as any);
      const list: any[] = response.data?.products || response.data || response;
      if (!Array.isArray(list)) return;

      const mapped = list.map((p: any) => {
        const variants = (p.variants || []).filter((v: any) => v.isActive !== false);
        const sorted   = [...variants].sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price));
        const lowest   = sorted[0];
        const basePrice     = parseFloat(lowest?.price)     || parseFloat(p.basePrice)     || 0;
        const discountPrice = parseFloat(lowest?.salePrice) || parseFloat(p.discountPrice) || basePrice;
        const discountPercent = basePrice > discountPrice
          ? Math.round(((basePrice - discountPrice) / basePrice) * 100)
          : (p.discountPercent || 0);
        const category = p.categories?.[0]?.category?.name || p.category || 'Mattress';
        return { ...p, category, basePrice, discountPrice, discountPercent };
      });

      setProducts(prev => {
        if (prev.length !== mapped.length) setCurrentIndex(0);
        return mapped;
      });
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(true); }, [fetchProducts]);
  useEffect(() => {
    const id = setInterval(() => fetchProducts(false), POLL_MS);
    return () => clearInterval(id);
  }, [fetchProducts]);

  // ── Get card width from CSS (percentage-based, no JS measurement needed) ──
  // We use CSS to size the cards: each card = calc(25% - 18px) of wrapper
  // For the slide step we read the actual rendered card width via ref.
  const getStep = useCallback((): number => {
    const track = trackRef.current;
    if (!track) return 0;
    const firstCard = track.firstElementChild as HTMLElement | null;
    if (!firstCard) return 0;
    return firstCard.offsetWidth + GAP;
  }, []);

  // ── Navigation ──────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (transitioning || products.length === 0) return;
    const step = getStep();
    if (step === 0) return;
    setTransitioning(true);
    const track = trackRef.current!;

    track.style.transition = 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)';
    track.style.transform  = `translateX(-${step}px)`;

    setTimeout(() => {
      track.style.transition = 'none';
      track.style.transform  = 'translateX(0)';
      setCurrentIndex(prev => (prev + 1) % products.length);
      setTransitioning(false);
    }, 450);
  }, [transitioning, products.length, getStep]);

  const goPrev = useCallback(() => {
    if (transitioning || products.length === 0) return;
    const step = getStep();
    if (step === 0) return;
    setTransitioning(true);
    const track = trackRef.current!;

    // jump right by one card (no animation), then animate back to 0
    track.style.transition = 'none';
    track.style.transform  = `translateX(-${step}px)`;
    setCurrentIndex(prev => (prev - 1 + products.length) % products.length);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      track.style.transition = 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)';
      track.style.transform  = 'translateX(0)';
      setTimeout(() => setTransitioning(false), 450);
    }));
  }, [transitioning, products.length, getStep]);

  // Auto-play
  useEffect(() => {
    if (products.length === 0) return;
    intervalRef.current = setInterval(() => {
      if (!pausedRef.current) goNext();
    }, AUTO_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [products.length, goNext]);

  // ── Render ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
            <div className="aspect-[4/3] bg-gray-200" />
            <div className="p-5 space-y-3">
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-6 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) return null;

  // VISIBLE + 1 cards — the extra one slides in from the right
  const displayCount = VISIBLE + 1;
  const displayProducts = Array.from({ length: displayCount }, (_, i) => {
    const idx = (currentIndex + i) % products.length;
    return { product: products[idx], originalIndex: idx };
  });

  const totalPages  = Math.ceil(products.length / VISIBLE);
  const currentPage = Math.floor(currentIndex / VISIBLE);

  return (
    <div
      className="relative"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* ← Prev */}
      <button
        onClick={goPrev}
        className="absolute -left-5 top-[42%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-[#1B2B6B] hover:text-white transition-colors"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Slider viewport */}
      <div ref={wrapperRef} className="overflow-hidden w-full">
        <div
          ref={trackRef}
          className="flex"
          style={{ gap: `${GAP}px` }}
        >
          {displayProducts.map(({ product, originalIndex }, i) => (
            <div
              key={`${product.id}-${currentIndex}-${i}`}
              className="flex-shrink-0"
              style={{
                // 4 visible cards with 3 gaps between them, 5th card hidden
                width: `calc((100% - ${(VISIBLE) * GAP}px) / ${VISIBLE})`,
              }}
            >
              <ProductCard product={product} index={originalIndex} />
            </div>
          ))}
        </div>
      </div>

      {/* → Next */}
      <button
        onClick={goNext}
        className="absolute -right-5 top-[42%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-[#1B2B6B] hover:text-white transition-colors"
        aria-label="Next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots + counter */}
      <div className="flex flex-col items-center gap-2 mt-6">
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => { if (!transitioning) setCurrentIndex(i * VISIBLE); }}
              className={`rounded-full transition-all duration-300 ${
                i === currentPage
                  ? 'w-6 h-2.5 bg-[#1B2B6B]'
                  : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-400">
          {currentIndex + 1}–{Math.min(currentIndex + VISIBLE, products.length)} of {products.length} products
        </span>
      </div>
    </div>
  );
}
