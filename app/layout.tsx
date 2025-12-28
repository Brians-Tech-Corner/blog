import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { Analytics } from '@/components/Analytics';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';

// Default OG image for homepage
const defaultOgImage = `${siteUrl}/api/og?title=Brian's Tech Corner&description=Homelab, Home Automation, and coding — built in public.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Brian's Tech Corner",
    template: "%s | Brian's Tech Corner",
  },
  description:
    'Homelab, Home Automation, and coding — built in public.',
  keywords: [
    'homelab',
    'home automation',
    'kubernetes',
    'home assistant',
    'python',
    'networking',
    'gitops',
  ],
  authors: [{ name: 'Brian' }],
  creator: 'Brian',
  publisher: "Brian's Tech Corner",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Brian's Tech Corner",
    description:
      'Homelab, Home Automation, and coding — built in public.',
    url: siteUrl,
    siteName: "Brian's Tech Corner",
    type: 'website',
    images: [{ url: defaultOgImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [defaultOgImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-white text-zinc-900 transition-colors dark:bg-zinc-900 dark:text-zinc-100">
        <ThemeProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-5xl px-4 py-10">{children}</main>
          <SiteFooter />
          <Analytics />
          <VercelAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
