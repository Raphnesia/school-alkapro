// src/app/profil/struktur-organisasi/page.tsx
// Halaman Struktur Organisasi dengan integrasi API backend dan struktur kompleks

'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { useStrukturOrganisasi } from '@/hooks/useStrukturOrganisasi';
import { StrukturOrganisasiLoading } from '@/components/StrukturOrganisasiLoading';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useI18n } from '@/hooks/useI18n';
import { strukturOrganisasiService, StrukturOrganisasiSettings, StrukturOrganisasiData, StrukturOrganisasiContent } from '@/services/strukturOrganisasiService';
import { BackendStatus } from '@/components/BackendStatus';
import { StrukturOrganisasiCard } from '@/components/StrukturOrganisasiCard';

export default function StrukturOrganisasiPage() {
  const { data, loading, error } = useStrukturOrganisasi();
  const { t } = useI18n();

  // Loading state
  if (loading) {
    return <StrukturOrganisasiLoading />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <ErrorMessage 
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // Gunakan data dari API atau fallback data
  let settings: StrukturOrganisasiSettings | null, strukturOrganisasi: StrukturOrganisasiData[], content: StrukturOrganisasiContent[];
  const hasBackendData = !!(data?.settings || (data?.struktur_organisasi && data.struktur_organisasi.length > 0) || (data?.content && data.content.length > 0));
  const isBackendOnline = data !== null; // Backend merespons
  
  if (hasBackendData && data) {
    // Gunakan data dari API
    settings = data.settings;
    strukturOrganisasi = data.struktur_organisasi || [];
    content = data.content || [];
  } else {
    // Fallback data untuk Struktur Organisasi
    settings = {
      id: 1,
      title: 'Struktur Organisasi SMP Muhammadiyah Al Kautsar PK Kartasura',
      subtitle: 'Susunan organisasi pengelolaan sekolah yang efektif',
      banner_desktop: '/guru/Heri-Septian-Munggaran-S.Pd_-300x400.jpg',
      banner_mobile: '/guru/Devy-Estu-Anna-Putri-S.T.-M.Pd_-300x400.jpg',
      title_panel_bg_color: 'bg-green-500',
      subtitle_panel_bg_color: 'bg-green-700',
      mobile_panel_bg_color: 'bg-green-700',
      is_active: true
    };
    
    strukturOrganisasi = [
      {
        id: 1,
        position: 'Kepala Sekolah',
        name: 'Drs. Mahmud Hasni, M.Pd.',
        photo: '/guru/Heri-Septian-Munggaran-S.Pd_-300x400.jpg',
        description: 'Bertanggung jawab atas keseluruhan pengelolaan dan pengembangan sekolah.',
        order_index: 1,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 2,
        position: 'Wakil Kepala Sekolah Bidang Kurikulum',
        name: 'Annisa Mayasari, S.Pd.',
        photo: '/guru/Annisa-Mayasari-S.Pd_.jpg',
        description: 'Bertanggung jawab dalam pengembangan dan implementasi kurikulum sekolah.',
        order_index: 2,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 3,
        position: 'Wakil Kepala Sekolah Bidang Kesiswaan',
        name: 'Ardiansyah Pratama Putra, S.Sn.',
        photo: '/guru/Ardiansyah-Pratama-Putra-S.Sn_.jpg',
        description: 'Bertanggung jawab dalam pembinaan dan pengembangan kegiatan kesiswaan.',
        order_index: 3,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 4,
        position: 'Wakil Kepala Sekolah Bidang Sarana Prasarana',
        name: 'Bakhtiar Fahmi, S.Sn.',
        photo: '/guru/Bakhtiar-Fahmi-S.Sn_.jpg',
        description: 'Bertanggung jawab dalam pengelolaan dan pengembangan sarana dan prasarana sekolah.',
        order_index: 4,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 5,
        position: 'Wakil Kepala Sekolah Bidang Humas',
        name: 'Cindy Trisnawati, S.Pd, M.Pd.',
        photo: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
        description: 'Bertanggung jawab dalam menjalin hubungan dengan masyarakat dan stakeholder sekolah.',
        order_index: 5,
        is_active: true,
        created_at: '',
        updated_at: ''
      },
      {
        id: 6,
        position: 'Kepala Tata Usaha',
        name: 'Devy Estu Anna Putri, S.T., M.Pd.',
        photo: '/guru/Devy-Estu-Anna-Putri-S.T.-M.Pd_-300x400.jpg',
        description: 'Bertanggung jawab dalam pengelolaan administrasi dan keuangan sekolah.',
        order_index: 6,
        is_active: true,
        created_at: '',
        updated_at: ''
      }
    ];
    
    content = [
      {
        id: 1,
        title: 'Struktur Organisasi Sekolah',
        content: 'Berikut adalah struktur organisasi SMP Muhammadiyah Al Kautsar PK Kartasura:',
        grid_type: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', // Responsive grid
        use_list_disc: true,
        list_items: null,
        bidang_structure: [
          {
            bidang_name: 'Kepemimpinan',
            members: [
              { name: 'Drs. Mahmud Hasni, M.Pd.', position: 'Kepala Sekolah' },
              { name: 'Annisa Mayasari, S.Pd.', position: 'Wakil Kepala Sekolah' },
              { name: 'Ardiansyah Pratama Putra, S.Sn.', position: 'Wakil Kepala Sekolah' }
            ]
          },
          {
            bidang_name: 'Bagian Administrasi',
            members: [
              { name: 'Devy Estu Anna Putri, S.T., M.Pd.', position: 'Kepala Tata Usaha' },
              { name: 'Cindy Trisnawati, S.Pd, M.Pd.', position: 'Wakil Kepala Sekolah Bidang Humas' },
              { name: 'Bakhtiar Fahmi, S.Sn.', position: 'Wakil Kepala Sekolah Bidang Sarana Prasarana' }
            ]
          },
          {
            bidang_name: 'Bagian Kurikulum',
            members: [
              { name: 'Annisa Mayasari, S.Pd.', position: 'Wakil Kepala Sekolah Bidang Kurikulum' },
              { name: 'Guru Matematika', position: 'Koordinator Mata Pelajaran' },
              { name: 'Guru IPA', position: 'Koordinator Mata Pelajaran' },
              { name: 'Guru Bahasa', position: 'Koordinator Mata Pelajaran' }
            ]
          }
        ],
        display_type: 'bagan',
        background_color: 'bg-white',
        border_color: 'border-gray-200',
        order_index: 1,
        is_active: true,
        created_at: '',
        updated_at: ''
      }
    ];
  }

  // Banner image
  const bannerImage = settings ? strukturOrganisasiService.getBannerUrl(settings.banner_desktop) : '/guru/Heri-Septian-Munggaran-S.Pd_-300x400.jpg';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BackendStatus isOnline={isBackendOnline} hasData={hasBackendData} />
      <Header />
      
      {/* Main Content */}
      <main className="pt-0 flex-1">
        {/* IMG dengan Overlay untuk Desktop */}
        <div className="relative w-full md:h-screen h-64">
          {/* Desktop Image */}
          <Image 
            src={bannerImage}
            alt="banner"
            fill
            className="object-cover hidden md:block"
            priority
            sizes="100vw"
            quality={75}
          />
          {/* Mobile Image - Height diperkecil untuk mobile */}
          <div className="relative w-full h-full md:hidden">
            <Image 
              src={settings ? strukturOrganisasiService.getBannerUrl(settings.banner_mobile) : '/guru/Devy-Estu-Anna-Putri-S.T.-M.Pd_-300x400.jpg'}
              alt="banner"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={75}
            />
          </div>
          
          {/* Overlay Content untuk Desktop */}
          <div className="absolute inset-0 hidden md:flex md:items-end">
            <div className="w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="container mx-auto px-8 pb-16">
                <div className="max-w-3xl">
                  {/* Title Panel */}
                  <div className="block">
                    <div className={`${settings?.title_panel_bg_color || 'bg-green-500'} inline-flex p-5`}>
                      <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-0 line-clamp-2">
                        {settings?.title || 'Struktur Organisasi SMP Muhammadiyah Al Kautsar PK Kartasura'}
                      </h1>
                    </div>
                  </div>
                  
                  {/* Subtitle Panel */}
                  <div className={`${settings?.subtitle_panel_bg_color || 'bg-green-700'} p-4 opacity-90 inline-flex rounded-b-lg`}>
                    <p className="text-white text-sm md:text-lg font-semibold mb-0">
                      {settings?.subtitle || 'Susunan organisasi pengelolaan sekolah yang efektif'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIV untuk Mobile - Tinggi disesuaikan dengan gambar */}
        <div className={`w-full ${settings?.mobile_panel_bg_color || 'bg-green-700'} py-4 md:hidden`}>
          <div className="container mx-auto px-4">
            <div className="block">
              {/* Title Panel untuk Mobile */}
              <div className={`${settings?.title_panel_bg_color || 'bg-green-500'} inline-flex p-3`}>
                <h1 className="text-lg font-bold text-white mb-0">
                  {settings?.title || 'Struktur Organisasi SMP Muhammadiyah Al Kautsar PK Kartasura'}
                </h1>
              </div>
              
              {/* Subtitle Panel untuk Mobile */}
              <div className={`${settings?.subtitle_panel_bg_color || 'bg-green-700'} mb-0 p-3 opacity-90 inline-flex`}>
                <div>
                  <p className="text-white text-xs font-semibold mb-0">
                    {settings?.subtitle || 'Susunan organisasi pengelolaan sekolah yang efektif'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Content Section */}
      <main className="flex-grow container mx-auto px-4 py-8 bg-white" style={{ minHeight: 'auto', display: 'block', visibility: 'visible', opacity: 1, position: 'relative', zIndex: 10 }}>
        {/* Debug Info - Hapus setelah testing */}
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">🔍 Debug Info</h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p><strong>Content Length:</strong> {content?.length || 0}</p>
            <p><strong>Struktur Organisasi Length:</strong> {strukturOrganisasi?.length || 0}</p>
            <p><strong>Has Backend Data:</strong> {hasBackendData ? 'Yes' : 'No'}</p>
            <p><strong>Backend Online:</strong> {isBackendOnline ? 'Yes' : 'No'}</p>
            <p><strong>Settings:</strong> {settings ? 'Available' : 'Not Available'}</p>
          </div>
        </div>

        <ScrollReveal>
          {/* Struktur Organisasi Content Sections */}
          {content && content.length > 0 && (
            <div className="prose prose-black max-w-none mb-12">
              {content.map((section: StrukturOrganisasiContent, index: number) => (
                <div key={section.id} className={`${section.background_color} ${section.border_color} rounded-lg shadow-md p-6 mb-8`}>
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-1 bg-primary rounded-full mr-3"></div>
                    <h2 className="text-2xl font-semibold text-primary">{section.title}</h2>
                    <div className="w-16 h-1 bg-primary rounded-full ml-3"></div>
                  </div>
                  
                  {/* Content Description */}
                  {section.content && (
                    <div className="mb-6 text-black" dangerouslySetInnerHTML={{ __html: section.content }} />
                  )}
                  
                  {/* Struktur Bidang Kompleks */}
                  {section.use_list_disc && section.bidang_structure && (
                    <div>
                      {/* Debug info - hapus setelah testing */}
                      <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
                        <strong>Debug:</strong> Grid Type: "{section.grid_type}" | Display Type: "{section.display_type}" | Bidang Count: {section.bidang_structure.length}
                      </div>
                      
                      <div className={`grid ${section.grid_type} gap-6`}>
                        {section.bidang_structure.map((bidang, bidangIndex) => (
                          <div key={bidangIndex} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            {/* Header Bidang */}
                            <div className="bg-green-600 text-white px-4 py-3">
                              <h3 className="font-semibold text-lg">{bidang.bidang_name}</h3>
                            </div>
                            
                            {/* Daftar Anggota */}
                            <div className="p-4">
                              {section.display_type === 'list' ? (
                                // List biasa
                                <ul className="list-disc list-inside space-y-2">
                                  {bidang.members.map((member, memberIndex) => (
                                    <li key={memberIndex} className="text-gray-700">
                                      {member.name}
                                      {member.position && (
                                        <span className="text-gray-500 ml-2">({member.position})</span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                // Bagan/Diagram - mirip dengan IPM
                                <div className="space-y-2">
                                  {bidang.members.map((member, memberIndex) => (
                                    <div key={memberIndex} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                      <div className="flex items-center">
                                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                                          {memberIndex + 1}
                                        </span>
                                        <span className="font-medium text-black">{member.name}</span>
                                      </div>
                                      {member.position && (
                                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                          {member.position}
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Legacy List Items (untuk backward compatibility) */}
                  {section.use_list_disc && section.list_items && !section.bidang_structure && (
                    <div className="space-y-3">
                      {section.list_items.map((item, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                          <p className="text-black font-medium">{item.item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Struktur Organisasi Section (Layout Asli) */}
          {strukturOrganisasi && strukturOrganisasi.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8 text-center">Struktur Organisasi</h2>
              <div className="space-y-8">
                {strukturOrganisasi.map((item: StrukturOrganisasiData, index: number) => (
                  <StrukturOrganisasiCard 
                    key={item.id} 
                    struktur={item} 
                    layout={index % 2 === 0 ? 'left' : 'right'}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Fallback message jika tidak ada data */}
          {(!strukturOrganisasi || strukturOrganisasi.length === 0) && (!content || content.length === 0) && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Data</h3>
                <p className="text-gray-600">
                  Data struktur organisasi belum tersedia. Silakan hubungi administrator untuk menambahkan data.
                </p>
              </div>
            </div>
          )}

          {/* Test Content - Hapus setelah testing */}
          <div className="mt-8 p-6 bg-blue-100 border border-blue-300 rounded-lg">
            <h3 className="text-xl font-bold text-blue-800 mb-3">🧪 Test Content</h3>
            <p className="text-blue-700 mb-4">Ini adalah test content untuk memastikan section ini terlihat.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold text-gray-800">Test Card 1</h4>
                <p className="text-gray-600">Ini adalah test card pertama</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold text-gray-800">Test Card 2</h4>
                <p className="text-gray-600">Ini adalah test card kedua</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
}