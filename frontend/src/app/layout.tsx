import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from './providers';
import { prisma } from '@/lib/prisma';
import { getPageMetadata } from '@/lib/pageSeo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

async function getSeoSettings() {
  try {
    const rows = await prisma.setting.findMany({
      where: {
        key: {
          in: [
            'seo_site_name', 'seo_tagline', 'seo_title_template',
            'seo_default_description', 'seo_default_keywords',
            'seo_og_image', 'seo_canonical_url',
            'seo_google_analytics_id', 'seo_google_site_verification',
          ],
        },
      },
    });
    const s: Record<string, string> = {};
    for (const r of rows) s[r.key] = r.value;
    return s;
  } catch {
    return {};
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSeoSettings();

  const siteName  = s.seo_site_name || 'MATTRESS FACTORY';
  const tagline   = s.seo_tagline   || 'Premium Quality Mattresses & Home Furnishings';
  const template  = s.seo_title_template || `%s | ${siteName}`;
  const canonical = s.seo_canonical_url  || '';
  const gaId      = s.seo_google_analytics_id || '';
  const gVerify   = s.seo_google_site_verification || '';

  // Per-page SEO for home page (merges with global settings)
  const homeMeta = await getPageMetadata('home', `${siteName} - ${tagline}`);

  const metadataBase = canonical
    ? (() => { try { return new URL(canonical.startsWith('http') ? canonical : `https://${canonical}`); } catch { return undefined; } })()
    : undefined;

  return {
    ...homeMeta,
    title: {
      default:  (homeMeta.title as string) || `${siteName} - ${tagline}`,
      template,
    },
    metadataBase,
    ...(gVerify ? { verification: { google: gVerify } } : {}),
    ...(gaId ? { other: { 'google-analytics': gaId } } : {}),
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
