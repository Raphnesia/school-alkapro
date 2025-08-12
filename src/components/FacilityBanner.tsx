// src/components/FacilityBanner.tsx
// Komponen banner untuk fasilitas

import React from 'react';
import { FacilitySettings, SubFacilitySettings } from '@/services/facilityService';

interface FacilityBannerProps {
  settings: FacilitySettings | SubFacilitySettings;
  isSubFacility?: boolean;
}

export const FacilityBanner: React.FC<FacilityBannerProps> = ({ 
  settings, 
  isSubFacility = false 
}) => {
  if (!settings) {
    return null;
  }

  return (
    <section id="banner-1" className="relative">
      {/* Desktop Banner */}
      {settings.banner_desktop && (
        <img 
          draggable={false}
          alt="banner"
          src={settings.banner_desktop}
          className="w-full hidden md:block"
        />
      )}
      
      {/* Mobile Banner */}
      {settings.banner_mobile && (
        <img 
          draggable={false}
          alt="banner"
          src={settings.banner_mobile}
          className="w-full block md:hidden"
        />
      )}
      
      {/* Fallback Banner if no images */}
      {!settings.banner_desktop && !settings.banner_mobile && (
        <div className="w-full h-64 md:h-96 bg-gradient-to-r from-blue-600 to-blue-800"></div>
      )}
      
      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="w-full lg:w-1/2">
            {/* Title Panel */}
            <div className={`${settings.title_panel_bg_color} inline-flex p-4 mb-4`}>
              <h1 className="text-2xl font-bold mb-0">
                {settings.title}
              </h1>
            </div>
            
            {/* Subtitle Panel */}
            <div className={`${settings.subtitle_panel_bg_color} p-4 inline-flex opacity-90`}>
              <div>
                <p className="text-white text-lg font-semibold mb-3">
                  {settings.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 