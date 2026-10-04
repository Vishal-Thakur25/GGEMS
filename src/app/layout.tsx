import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider';
import { getSeoSettings } from '@/server/queries';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  return {
    title: {
      default: seo?.metaTitle || 'GGems Squash Academy | Delhi NCR Premier High Performance Squash Coaching',
      template: '%s | GGems Squash Academy',
    },
    description:
      seo?.metaDescription ||
      'Official website of GGems Squash Academy Delhi NCR. High-performance squash athlete development, 10 centers, verified national champion coaches.',
    keywords: seo?.metaKeywords?.split(',') || ['squash', 'delhi ncr squash', 'ggems'],
    metadataBase: new URL(seo?.canonicalBaseUrl || 'https://ggemssquash.com'),
    openGraph: {
      title: seo?.metaTitle || 'GGems Squash Academy',
      description: seo?.metaDescription || 'Premier Squash Academy in Delhi NCR',
      url: seo?.canonicalBaseUrl || 'https://ggemssquash.com',
      siteName: 'GGems Squash Academy',
      images: [
        {
          url: seo?.ogImageUrl || 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <body className="bg-white text-zinc-950 font-sans antialiased selection:bg-[#48A427] selection:text-white min-h-screen flex flex-col">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
