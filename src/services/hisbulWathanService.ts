// src/services/hisbulWathanService.ts
// Service untuk Hisbul Wathan API integration dengan struktur bidang kompleks

import { getApiUrl } from '@/lib/config';

export interface HisbulWathanSettings {
  id: number;
  title: string;
  subtitle: string;
  banner_desktop: string;
  banner_mobile: string;
  title_panel_bg_color: string;
  subtitle_panel_bg_color: string;
  mobile_panel_bg_color: string;
  is_active: boolean;
}

export interface HisbulWathanPengurus {
  id: number;
  position: string;
  name: string;
  photo: string;
  kelas: string;
  description: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HisbulWathanBidangMember {
  name: string;
  position?: string;
}

export interface HisbulWathanBidangStructure {
  bidang_name: string;
  members: HisbulWathanBidangMember[];
}

export interface HisbulWathanContent {
  id: number;
  title: string;
  content: string;
  grid_type: string;
  use_list_disc: boolean;
  list_items: { item: string }[] | null;
  bidang_structure: HisbulWathanBidangStructure[] | null;
  background_color: string;
  border_color: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HisbulWathanCompleteData {
  settings: HisbulWathanSettings | null;
  pengurus: HisbulWathanPengurus[];
  content: HisbulWathanContent[];
}

export class HisbulWathanService {
  private static instance: HisbulWathanService;

  private constructor() {}

  public static getInstance(): HisbulWathanService {
    if (!HisbulWathanService.instance) {
      HisbulWathanService.instance = new HisbulWathanService();
    }
    return HisbulWathanService.instance;
  }

  // Get complete Hisbul Wathan data (settings + content + pengurus)
  async getCompleteData(): Promise<HisbulWathanCompleteData | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(getApiUrl('/hisbul-wathan/complete'), {
        signal: controller.signal,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Hisbul Wathan complete data:', error);
      return null;
    }
  }

  // Get Hisbul Wathan settings only
  async getSettings(): Promise<HisbulWathanSettings | null> {
    try {
      const response = await fetch(getApiUrl('/hisbul-wathan/settings'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Hisbul Wathan settings:', error);
      return null;
    }
  }

  // Get all Hisbul Wathan pengurus
  async getPengurus(): Promise<HisbulWathanPengurus[] | null> {
    try {
      const response = await fetch(getApiUrl('/hisbul-wathan'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Hisbul Wathan pengurus:', error);
      return null;
    }
  }

  // Get Hisbul Wathan content
  async getContent(): Promise<HisbulWathanContent[] | null> {
    try {
      const response = await fetch(getApiUrl('/hisbul-wathan-content'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Hisbul Wathan content:', error);
      return null;
    }
  }

  // Get single Hisbul Wathan pengurus by ID
  async getPengurusById(id: number): Promise<HisbulWathanPengurus | null> {
    try {
      const response = await fetch(getApiUrl(`/hisbul-wathan/${id}`));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Hisbul Wathan pengurus by ID:', error);
      return null;
    }
  }

  // Get banner URL with fallback
  getBannerUrl(imageUrl: string): string {
    if (!imageUrl) {
      return '/guru/Adam-Muttaqien-M.Si_.jpg'; // Fallback image
    }
    return imageUrl;
  }

  // Get photo URL with fallback
  getPhotoUrl(photoUrl: string): string {
    if (!photoUrl) {
      return '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg'; // Fallback image
    }
    return photoUrl;
  }
}

export const hisbulWathanService = HisbulWathanService.getInstance();
