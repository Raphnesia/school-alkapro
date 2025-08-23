// src/app/profil/tapak-suci/page.tsx
// Halaman Tapak Suci dengan integrasi API backend dan struktur bidang kompleks

'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { useTapakSuci } from '@/hooks/useTapakSuci';
import { tapakSuciService } from '@/services/tapakSuciService';

export default function TapakSuciPage() {
  const { data, loading, error } = useTapakSuci()

  // Debug: Log data yang diterima
  console.log('🔍 Tapak Suci Data:', data)
  console.log('🔍 Settings:', data?.settings)
  console.log('🔍 Content:', data?.content)

  const heroTitle = data?.settings?.hero_title || 'Tapak Suci'
  const heroSubtitle = data?.settings?.hero_subtitle || 'Pencak Silat Muhammadiyah'
  const heroBgColor = data?.settings?.hero_background_color || '#1e40af'
  const heroTextColor = data?.settings?.hero_text_color || '#ffffff'

  // Fallback content jika API kosong
  const fallbackContent = [
    {
      id: 1,
      title: 'Sejarah Tapak Suci',
      content: 'Tapak Suci adalah organisasi pencak silat yang didirikan oleh Muhammadiyah...',
      image: '/ilustrasi/tapak-suci.jpg',
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: 2,
      title: 'Visi dan Misi',
      content: 'Mewujudkan manusia muslim yang beriman dan bertaqwa kepada Allah SWT...',
      image: '/ilustrasi/visi-misi.jpg',
      created_at: '2024-01-02',
      updated_at: '2024-01-02'
    }
  ]

  const contentData = (data?.content && data.content.length > 0) ? data.content : fallbackContent

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data Tapak Suci...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h1>
          <p className="text-gray-600 mb-4">Gagal memuat data Tapak Suci</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    )
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
                      src={tapakSuciService.getImageUrl(item.image, '/ilustrasi/tapak-suci.jpg')}
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
  )
}
