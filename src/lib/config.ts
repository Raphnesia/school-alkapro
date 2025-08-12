// src/lib/config.ts
// Konfigurasi environment variables dan settings aplikasi

export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://api.raphnesia.my.id/api/v1',
    timeout: 10000, // 10 seconds
  },
  
  // Site Configuration
  site: {
    name: 'SMP Muhammadiyah Al Kautsar PK Kartasura',
    description: 'Sekolah Menengah Pertama Muhammadiyah Al Kautsar PK Kartasura',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  
  // Image Configuration
  images: {
    domains: ['localhost', '127.0.0.1'],
    formats: ['image/webp', 'image/jpeg', 'image/png'],
    sizes: {
      thumbnail: 150,
      small: 300,
      medium: 600,
      large: 1200,
    },
  },
  
  // Feature Flags
  features: {
    enablePimpinanSMP: true,
    enableTeacherManagement: true,
    enableNewsAndArticles: true,
    enableDisqusComments: false,
  },
  
  // Error Messages
  messages: {
    networkError: 'Terjadi kesalahan jaringan. Silakan cek koneksi internet Anda.',
    serverError: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.',
    notFound: 'Data yang Anda cari tidak ditemukan.',
    unauthorized: 'Anda tidak memiliki akses ke halaman ini.',
    defaultError: 'Terjadi kesalahan yang tidak diketahui.',
  },
} as const;

// Type untuk config
export type Config = typeof config;

// Helper function untuk mendapatkan API URL
export function getApiUrl(endpoint: string): string {
  return `${config.api.baseUrl}${endpoint}`;
}

// Helper function untuk mendapatkan image URL
export function getImageUrl(path: string): string {
  if (path.startsWith('http')) {
    return path;
  }
  return `${config.api.baseUrl.replace('/api/v1', '')}${path}`;
} 