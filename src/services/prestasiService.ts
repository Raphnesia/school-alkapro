// src/services/prestasiService.ts
import { getApiUrl } from '@/lib/config'

export interface PrestasiSettings {
  main_heading: string
  hero_bg_from: string
  hero_bg_via: string
  hero_bg_to: string
  badge_text: string
  floating_elements_bg_color: string
  floating_elements_text_color: string
}

export interface Post {
  id: number
  title: string
  subtitle: string
  content: string | null
  image: string
  author_image: string
  category: string | null
  author: string
  tags: string[]
  slug: string
  navigation_sections: any[]
  published_at: string
  created_at: string
}

export interface PrestasiComplete {
  settings: PrestasiSettings | null
  right_image: Post | null
  list_prestasi: Post[]
  list_tahfidz: Post[]
}

class PrestasiService {
  private static instance: PrestasiService
  private constructor() {}

  public static getInstance(): PrestasiService {
    if (!PrestasiService.instance) PrestasiService.instance = new PrestasiService()
    return PrestasiService.instance
  }

  async getCompleteData(): Promise<PrestasiComplete | null> {
    try {
      // Ambil data prestasi dari berita dengan tag "prestasi"
      const prestasiResponse = await fetch(getApiUrl('/news?tags=prestasi'), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      
      // Ambil data tahfidz dari berita dengan tag "ujian tahfidz"
      const tahfidzResponse = await fetch(getApiUrl('/news?tags=ujian%20tahfidz'), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })

      if (!prestasiResponse.ok || !tahfidzResponse.ok) {
        throw new Error(`HTTP Error: Prestasi ${prestasiResponse.status}, Tahfidz ${tahfidzResponse.status}`)
      }

      const prestasiData = await prestasiResponse.json()
      const tahfidzData = await tahfidzResponse.json()

      // Ambil right image dari berita prestasi pertama
      const rightImage = prestasiData?.data?.[0] || null

      // Debug: Log response API
      console.log('🔍 Prestasi News Response:', prestasiData)
      console.log('🔍 Tahfidz News Response:', tahfidzData)
      console.log('🔍 Right Image from Prestasi:', rightImage)
      
      return {
        settings: null, // Settings tidak tersedia dari news endpoint
        right_image: rightImage,
        list_prestasi: prestasiData?.data || [],
        list_tahfidz: tahfidzData?.data || []
      }
    } catch (e) {
      console.error('Error fetching Prestasi data from news:', e)
      return null
    }
  }

  async getSettings(): Promise<PrestasiSettings | null> {
    try {
      const res = await fetch(getApiUrl('/prestasi/settings'), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json?.data ?? null
    } catch (e) {
      console.error('Error fetching Prestasi settings:', e)
      return null
    }
  }

  async getRightImage(): Promise<Post | null> {
    try {
      const res = await fetch(getApiUrl('/news?tags=prestasi&limit=1'), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json?.data?.[0] ?? null
    } catch (e) {
      console.error('Error fetching Prestasi right image:', e)
      return null
    }
  }

  async getPrestasiList(page = 1): Promise<{ data: Post[]; pagination: any } | null> {
    try {
      const res = await fetch(getApiUrl(`/news?tags=prestasi&page=${page}`), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json ?? null
    } catch (e) {
      console.error('Error fetching Prestasi list:', e)
      return null
    }
  }

  async getTahfidzList(page = 1): Promise<{ data: Post[]; pagination: any } | null> {
    try {
      const res = await fetch(getApiUrl(`/news?tags=ujian%20tahfidz&page=${page}`), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json ?? null
    } catch (e) {
      console.error('Error fetching Tahfidz list:', e)
      return null
    }
  }

  getImageUrl(url: string | null, fallback: string): string {
    if (!url || typeof url !== 'string' || url.trim() === '') return fallback
    return url
  }
}

export const prestasiService = PrestasiService.getInstance() 