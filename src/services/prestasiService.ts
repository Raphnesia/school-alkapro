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
  excerpt: string
  content: string
  featured_image: string
  category: 'academic' | 'achievement' | 'activity' | 'announcement' | 'history'
  tags: string[]
  is_published: boolean
  published_at: string
  created_at: string
  updated_at: string
}

export interface PrestasiComplete {
  settings: PrestasiSettings
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
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)
      const res = await fetch(getApiUrl('/prestasi'), {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      clearTimeout(timeoutId)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      
      // Debug: Log response API
      console.log('🔍 API Response:', json)
      console.log('🔍 API Data:', json?.data)
      console.log('🔍 Right Image from API:', json?.data?.right_image)
      console.log('🔍 Prestasi List from API:', json?.data?.list_prestasi)
      console.log('🔍 Tahfidz List from API:', json?.data?.list_tahfidz)
      
      return json?.data ?? null
    } catch (e) {
      console.error('Error fetching Prestasi complete:', e)
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
      const res = await fetch(getApiUrl('/prestasi/right-image'), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json?.data ?? null
    } catch (e) {
      console.error('Error fetching Prestasi right image:', e)
      return null
    }
  }

  async getPrestasiList(page = 1): Promise<{ data: Post[]; pagination: any } | null> {
    try {
      const res = await fetch(getApiUrl(`/prestasi/list-prestasi?page=${page}`), {
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
      const res = await fetch(getApiUrl(`/prestasi/list-tahfidz?page=${page}`), {
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