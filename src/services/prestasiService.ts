// src/services/prestasiService.ts
import { getApiUrl } from '@/lib/config'

export interface PrestasiSettings {
  id: number
  hero_bg_from: string
  hero_bg_via: string
  hero_bg_to: string
  badge_text: string
  is_active: boolean
}

export interface SimplePost {
  id: number
  title: string
  slug: string
  subtitle?: string | null
  image: string | null
  author_image: string | null
  category: string | null
  author: string | null
  tags: string[]
  published_at: string | null
}

export interface PrestasiCompleteData {
  settings: PrestasiSettings | null
  right_image: { image: string | null; title: string; slug: string } | null
  prestasi: SimplePost[]
  tahfidz: SimplePost[]
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
      return json?.data ?? null
    } catch (e) {
      console.error('Error fetching Prestasi complete:', e)
      return null
    }
  }

  getImageUrl(url: string | null, fallback: string): string {
    if (!url || typeof url !== 'string' || url.trim() === '') return fallback
    return url
  }
}

export const prestasiService = PrestasiService.getInstance() 