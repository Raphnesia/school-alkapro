// src/components/TapakSuciCard.tsx
// Card component untuk menampilkan pengurus Tapak Suci

import React from 'react';
import Image from 'next/image';
import { TapakSuciPengurus, tapakSuciService } from '@/services/tapakSuciService';

interface TapakSuciCardProps {
  pengurus: TapakSuciPengurus;
  layout: 'left' | 'right';
}

export function TapakSuciCard({ pengurus, layout }: TapakSuciCardProps) {
  const photoUrl = tapakSuciService.getPhotoUrl(pengurus.photo);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className={`md:flex ${layout === 'right' ? 'md:flex-row-reverse' : ''}`}>
        {/* Photo Section */}
        <div className="md:w-1/3 relative">
          <div className="h-64 md:h-full relative">
            <Image
              src={photoUrl}
              alt={pengurus.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Orange overlay for Tapak Suci theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-2/3 p-6">
          <div className="flex flex-col h-full justify-center">
            {/* Position Badge */}
            <div className="inline-flex items-center mb-3">
              <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full">
                {pengurus.position}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {pengurus.name}
            </h3>

            {/* Class */}
            <div className="flex items-center mb-4">
              <svg className="w-4 h-4 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-gray-600 font-medium">{pengurus.kelas}</span>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-4">
              {pengurus.description}
            </p>

            {/* Decorative Element */}
            <div className="flex items-center">
              <div className="w-12 h-1 bg-orange-600 rounded-full"></div>
              <div className="w-6 h-1 bg-orange-400 rounded-full ml-2"></div>
              <div className="w-3 h-1 bg-orange-300 rounded-full ml-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
