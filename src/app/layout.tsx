import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from '../components/Footer';
import { i18n } from '@/lib/i18n';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SMP Muhammadiyah Al Kautsar PK Kartasura",
  description: "Sekolah yang mengintegrasikan pendidikan akademik dengan nilai-nilai Islam untuk membentuk generasi yang berakhlak mulia dan berprestasi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = typeof window === 'undefined' ? 'id' : (localStorage.getItem('locale') || 'id')
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* Preconnect ke backend API untuk kurangi DNS+TLS handshake */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}