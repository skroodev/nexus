"use client";

import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../../lib/config';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const hero = siteConfig.hero;
  const identity = siteConfig.identity;
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load video after LCP and when viewport is ready
  useEffect(() => {
    // Wait for page to be interactive before loading video
    const loadVideo = () => {
      // Use requestIdleCallback for optimal loading timing
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
          setVideoLoaded(true);
        });
      } else {
        // Fallback: load after 1.5 seconds
        setTimeout(() => setVideoLoaded(true), 1500);
      }
    };

    // Trigger after component mount with a small delay
    const timer = setTimeout(loadVideo, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen max-w-fluid mx-auto relative overflow-hidden">
      {/* Video section - hauteur adaptative */}
      <div ref={containerRef} className="h-[75vh] sm:h-[80vh] relative overflow-hidden rounded-b-2xl sm:rounded-b-[2rem] mb-4 sm:mb-6 shadow-2xl">
        {/* Poster image for LCP optimization - priority loading */}
        <Image
          src={hero.backgroundImage}
          alt="Hero background"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover rounded-b-2xl sm:rounded-b-[2rem]"
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBSExBhITQWFx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/ANH6f1Wz0/Tbq3uLV5ZZLhpBIsgUDKoMYIPis+urm4uH8k880r4A7pJC5x9ySaKKUyJgAVYCVuJJP//Z"
        />
        
        {/* Video - lazy loaded after image with fade-in */}
        {videoLoaded && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover rounded-b-2xl sm:rounded-b-[2rem] animate-fadeIn"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          >
            <source src="/images/webm/hero-video.webm" type="video/webm" />
          </video>
        )}
        
        <div className="absolute inset-0 p-4 sm:p-6 md:p-10 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end">
          <div className="max-w-fluid mx-auto w-full pb-4 sm:pb-8">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-fluid-hero font-bold text-white mix-blend-difference leading-tight">
                {hero.headline.split(', ')[0]},<br />{hero.headline.split(', ')[1]}
              </h1>
              
              <hr className="border-white/30 my-4 sm:my-8" />
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <p className="text-fluid-base sm:text-fluid-lg text-white/90 max-w-xl leading-relaxed">
                  {hero.subheadline.split('. ')[0]}.<br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>{hero.subheadline.split('. ')[1]}
                </p>
                <div className="flex-shrink-0">
                  <Link 
                    href={hero.ctaButton.href} 
                    className="inline-flex bg-primary text-black px-4 sm:px-6 py-3 sm:py-4 rounded-full font-medium text-fluid-sm sm:text-fluid-base whitespace-nowrap hover:bg-primary/90 transition-colors"
                  >
                    {hero.ctaButton.text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badge section - grille responsive */}
      {hero.badge?.show && (
        <div className="py-4 sm:py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <div className="bg-[#2a2a2a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <div className="text-fluid-3xl sm:text-fluid-4xl font-bold text-primary mb-1 sm:mb-2">{identity.yearsInBusiness}+</div>
              <div className="text-fluid-xs sm:text-fluid-sm text-gray-400">Années d'expertise</div>
            </div>
            <div className="bg-[#2a2a2a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <div className="text-fluid-3xl sm:text-fluid-4xl font-bold text-primary mb-1 sm:mb-2">{identity.projectsCompleted}+</div>
              <div className="text-fluid-xs sm:text-fluid-sm text-gray-400">Projets réalisés</div>
            </div>
            <div className="bg-[#2a2a2a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <div className="text-fluid-3xl sm:text-fluid-4xl font-bold text-primary mb-1 sm:mb-2">{identity.teamSize}</div>
              <div className="text-fluid-xs sm:text-fluid-sm text-gray-400">Experts passionnés</div>
            </div>
            <div className="bg-[#2a2a2a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <div className="text-fluid-3xl sm:text-fluid-4xl font-bold text-primary mb-1 sm:mb-2">{identity.founded}</div>
              <div className="text-fluid-xs sm:text-fluid-sm text-gray-400">Fondation</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
