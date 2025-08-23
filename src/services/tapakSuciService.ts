// src/services/tapakSuciService.ts
// Service untuk Tapak Suci API integration dengan struktur bidang kompleks

import { getApiUrl } from '@/lib/config';

export interface TapakSuciSettings {
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

export interface TapakSuciPengurus {
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

export interface TapakSuciBidangMember {
  name: string;
  position?: string;
}

export interface TapakSuciBidangStructure {
  bidang_name: string;
  members: TapakSuciBidangMember[];
}

export interface TapakSuciContent {
  id: number;
  title: string;
  content: string;
  grid_type: string;
  use_list_disc: boolean;
  list_items: { item: string }[] | null;
  bidang_structure: TapakSuciBidangStructure[] | null;
  background_color: string;
  border_color: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TapakSuciCompleteData {
  settings: TapakSuciSettings | null;
  pengurus: TapakSuciPengurus[];
  content: TapakSuciContent[];
}

export class TapakSuciService {
  private static instance: TapakSuciService;

  private constructor() {}

  public static getInstance(): TapakSuciService {
    if (!TapakSuciService.instance) {
      TapakSuciService.instance = new TapakSuciService();
    }
    return TapakSuciService.instance;
  }

  // Get complete Tapak Suci data (settings + content + pengurus)
  async getCompleteData(): Promise<TapakSuciCompleteData | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(getApiUrl('/tapak-suci/complete'), {
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
      console.error('Error fetching Tapak Suci complete data:', error);
      return null;
    }
  }

  // Get Tapak Suci settings only
  async getSettings(): Promise<TapakSuciSettings | null> {
    try {
      const response = await fetch(getApiUrl('/tapak-suci/settings'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Tapak Suci settings:', error);
      return null;
    }
  }

  // Get all Tapak Suci pengurus
  async getPengurus(): Promise<TapakSuciPengurus[] | null> {
    try {
      const response = await fetch(getApiUrl('/tapak-suci'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Tapak Suci pengurus:', error);
      return null;
    }
  }

  // Get Tapak Suci content
  async getContent(): Promise<TapakSuciContent[] | null> {
    try {
      const response = await fetch(getApiUrl('/tapak-suci-content'));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Tapak Suci content:', error);
      return null;
    }
  }

  // Get single Tapak Suci pengurus by ID
  async getPengurusById(id: number): Promise<TapakSuciPengurus | null> {
    try {
      const response = await fetch(getApiUrl(`/tapak-suci/${id}`));
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Tapak Suci pengurus by ID:', error);
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

export const tapakSuciService = TapakSuciService.getInstance();
