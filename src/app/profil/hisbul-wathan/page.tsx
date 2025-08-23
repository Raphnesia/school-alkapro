// src/app/profil/hisbul-wathan/page.tsx
// Halaman Hisbul Wathan dengan integrasi API backend dan struktur bidang kompleks

'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { useHisbulWathan } from '@/hooks/useHisbulWathan';
import { HisbulWathanLoading } from '@/components/HisbulWathanLoading';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useI18n } from '@/hooks/useI18n';
import { hisbulWathanService } from '@/services/hisbulWathanService';
import { BackendStatus } from '@/components/BackendStatus';
import { HisbulWathanCard } from '@/components/HisbulWathanCard';

export default function HisbulWathanPage() {
  const { data, loading, error } = useHisbulWathan();
  const { t } = useI18n();

  // Debug: Log data yang diterima
  console.log('🔍 Hisbul Wathan Data:', data);
  console.log('🔍 Settings:', data?.settings);
  console.log('🔍 Content:', data?.content);

  const heroTitle = data?.settings?.hero_title || 'Hisbul Wathan';
  const heroSubtitle = data?.settings?.hero_subtitle || 'Kepanduan Muhammadiyah';
  const heroBgColor = data?.settings?.hero_background_color || '#059669';
  const heroTextColor = data?.settings?.hero_text_color || '#ffffff';

  // Fallback content jika API kosong
  const fallbackContent = [
    {
      id: 1,
      title: 'Sejarah Hisbul Wathan',
      content: 'Hisbul Wathan adalah organisasi kepanduan yang didirikan oleh Muhammadiyah...',
      image: '/ilustrasi/hisbul-wathan.jpg',
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: 2,
      title: 'Visi dan Misi',
      content: 'Membentuk manusia muslim yang beriman, bertaqwa, dan berakhlak mulia...',
      image: '/ilustrasi/visi-misi-hw.jpg',
      created_at: '2024-01-02',
      updated_at: '2024-01-02'
    }
  ];

  const contentData = (data?.content && data.content.length > 0) ? data.content : fallbackContent;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data Hisbul Wathan...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h1>
          <p className="text-gray-600 mb-4">Gagal memuat data Hisbul Wathan</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 lg:py-32 text-center text-white"
        style={{ backgroundColor: heroBgColor }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">{heroTitle}</h1>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">{heroSubtitle}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contentData.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {item.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={hisbulWathanService.getImageUrl(item.image, '/ilustrasi/hisbul-wathan.jpg')}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <div 
                    className="text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
