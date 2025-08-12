'use client'

import React from 'react'

interface VideoBackgroundProps {
  videoSrc?: string
  backgroundImageUrl?: string
  className?: string
  children?: React.ReactNode
}

export function VideoBackground({
  videoSrc,
  backgroundImageUrl,
  className = '',
  children,
}: VideoBackgroundProps) {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : backgroundImageUrl ? (
          <img src={backgroundImageUrl} alt="Background" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800" />
        )}
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  )
}