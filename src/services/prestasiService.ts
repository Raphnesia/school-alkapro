// src/services/prestasiService.ts
import { getApiUrl } from '@/lib/config'

export interface PrestasiSettings {
  main_heading: string
  hero_background_color: string
  hero_text_color: string
}

export interface PrestasiRightImage {
  id: number
  title: string
  excerpt: string
  image: string
  published_at: string
}

export interface PrestasiPost {
  id: number
  title: string
  excerpt: string
  image: string
  published_at: string
  tags: string[]
}

export interface TahfidzPost {
  id: number
  title: string
  excerpt: string
  image: string
  published_at: string
  tags: string[]
}

export interface PrestasiCompleteData {
  settings: PrestasiSettings | null
  right_image: PrestasiRightImage | null
  prestasi_list: PrestasiPost[]
  tahfidz_list: TahfidzPost[]
}

class PrestasiService {
  private static instance: PrestasiService
  private constructor() {}

  public static getInstance(): PrestasiService {
    if (!PrestasiService.instance) PrestasiService.instance = new PrestasiService()
    return PrestasiService.instance
  }

  async getCompleteData(): Promise<PrestasiCompleteData | null> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)
      const res = await fetch(getApiUrl('/prestasi/complete'), {
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
      console.log('🔍 Prestasi List from API:', json?.data?.prestasi_list)
      console.log('🔍 Tahfidz List from API:', json?.data?.tahfidz_list)
      
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

  async getRightImage(): Promise<PrestasiRightImage | null> {
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

  async getPrestasiList(page = 1): Promise<{ data: PrestasiPost[]; pagination: any } | null> {
    try {
      const res = await fetch(getApiUrl(`/prestasi/list?page=${page}`), {
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

  async getTahfidzList(page = 1): Promise<{ data: TahfidzPost[]; pagination: any } | null> {
    try {
      const res = await fetch(getApiUrl(`/prestasi/tahfidz?page=${page}`), {
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