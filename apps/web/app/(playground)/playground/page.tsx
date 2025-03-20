import type { Metadata } from 'next';
import { EditorPreview } from '@/components/editor-preview';
import { EditorTopbar } from '@/components/editor-topbar';

export const metadata: Metadata = {
  title: 'Playground | Maily',
  description: 'Try out Maily, the Open-source editor for crafting emails.',
  twitter: {
    creator: '@imarikchakma',
    title: 'Playground | Maily',
    description: 'Try out Maily, the Open-source editor for crafting emails.',
    card: 'summary_large_image',
  },
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
  openGraph: {
    siteName: 'Maily',
    title: 'Playground | Maily',
    description: 'Try out Maily, the Open-source editor for crafting emails.',
    type: 'website',
    url: 'https://maily.to',
    locale: 'en-US',
    images: {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Maily Preview',
    },
  },
};

export default async function Playground() {
  return (
    <main className="mx-auto w-full max-w-[calc(600px+40px)] px-5">
      <EditorTopbar className="mt-6" />
      <EditorPreview />
    </main>
  );
}
