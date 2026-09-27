import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LifePivot // Next 5 Years - Hayat Kırılmaları & Pişmanlık Önleme Simülatörü',
  description:
    'Önümüzdeki 5 yılın en kritik kırılma noktasını ve pişmanlık riskini simüle et. Multiverse çift zaman çizgisi, 3. yıl darboğaz analizi ve Spotify Wrapped tarzı görsel kart üretici.',
  keywords: [
    'hayat kırılmaları simülatörü',
    'next 5 years',
    'lifepivot',
    'pişmanlık simülatörü',
    'altın kelepçe sendromu',
    'multiverse hayat analizi'
  ],
  openGraph: {
    title: 'LifePivot // Next 5 Years Simülatörü',
    description: 'Önümüzdeki 5 yıldaki kritik kırılma noktanı ve pişmanlık riskini hesapla.',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-neutral-100">{children}</body>
    </html>
  );
}
