"use client";

import React, { useEffect, useRef } from 'react';
import { siteConfig, Service } from '../../lib/config';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesSection() {
  const services = siteConfig.services.items;
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use IntersectionObserver instead of GSAP ScrollTrigger for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe title elements
    const title = sectionRef.current?.querySelector('h2');
    const desc = sectionRef.current?.querySelector('p');
    if (title) observer.observe(title);
    if (desc) observer.observe(desc);

    // Observe cards
    const cards = cardsRef.current?.querySelectorAll('.service-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-12 sm:py-16 md:py-24 relative"
      style={{ background: siteConfig.sectionDesign?.services?.background || '#1C1C1C' }}
    >
      {/* Glow effect en haut de section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-fluid mx-auto">
        <div className="mb-8">
          <h2 className="text-fluid-5xl sm:text-fluid-6xl md:text-fluid-7xl text-white font-bold opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">{siteConfig.services.sectionTitle}</h2>
          <p className="text-[#DBA800] text-fluid-xl sm:text-fluid-2xl md:text-fluid-3xl opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100 [&.animate-in]:opacity-80 [&.animate-in]:translate-y-0">{siteConfig.services.sectionDescription}</p>
        </div>
        <div ref={cardsRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((s: Service, index: number) => (
              <div 
                key={s.id} 
                className="service-card cursor-pointer bg-primary border border-[#F0C419]/30 p-4 sm:p-6 rounded-lg shadow-sm aspect-[1/1] sm:aspect-[4/5] flex flex-col justify-between relative overflow-hidden opacity-0 translate-y-8 scale-95 transition-all duration-500 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 [&.animate-in]:scale-100"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover bg-image transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  quality={70}
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <h3 className="text-fluid-xl sm:text-fluid-2xl md:text-fluid-3xl font-medium text-white relative z-10">{s.title}</h3>
                <div className="relative z-10 space-y-3">
                  <p className="text-fluid-sm sm:text-fluid-base md:text-fluid-lg text-gray-200 line-clamp-3">{s.description}</p>
                  <Link href="#" className="cta-link relative w-fit inline-block text-fluid-sm sm:text-fluid-base bg-primary/90 text-black py-1 px-2 sm:px-3 rounded font-medium transition-all duration-300">
                    {s.ctaText}
                    <span className="cta-arrow absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 transition-all duration-300 opacity-0 translate-x-2">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
