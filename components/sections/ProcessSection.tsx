"use client";

import { useEffect, useRef } from 'react';
import { siteConfig, ProcessStep } from '../../lib/config';
import SpotlightCard from '../SpotlightCard';
import ScrollReveal from '../ScrollReveal';
import AnimatedList from '../AnimatedList';
import Image from 'next/image';

export default function ProcessSection() {
  const steps = siteConfig.process.steps;
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use IntersectionObserver instead of GSAP for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const title = leftRef.current?.querySelector('h2');
    const desc = leftRef.current?.querySelector('p');
    if (title) observer.observe(title);
    if (desc) observer.observe(desc);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative"
      style={{ background: siteConfig.sectionDesign?.process?.background || '#1C1C1C' }}
    >
      {/* Séparateur doré en haut */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      
      {/* ScrollReveal section - pinned with scroll animation */}
      <ScrollReveal
        textClassName="text-white text-fluid-lg sm:text-fluid-xl md:text-fluid-2xl leading-relaxed max-w-4xl text-left"
      >
        {siteConfig.process.sectionText}
      </ScrollReveal>

      {/* Process steps section */}
      <div className="py-12 sm:py-16 md:py-24">
        {/* Title - with padding */}
        <div className="max-w-fluid mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
          <div ref={leftRef} className="lg:hidden">
            <h2 className="text-fluid-5xl text-white sm:text-fluid-6xl md:text-fluid-7xl font-bold opacity-0 -translate-x-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-x-0">{siteConfig.process.sectionTitle}</h2>
            <p className="text-[#DBA800] text-fluid-xl sm:text-fluid-2xl md:text-fluid-3xl opacity-0 -translate-x-8 transition-all duration-700 ease-out delay-150 [&.animate-in]:opacity-80 [&.animate-in]:translate-x-0">{siteConfig.process.sectionDescription}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 min-h-[60vh] sm:min-h-[80vh] max-w-fluid mx-auto lg:px-6">
          {/* Left column: Sticky title and description - desktop only */}
          <div className="hidden lg:block lg:sticky lg:top-1/2 lg:-translate-y-1/2 lg:self-start lg:mb-24 lg:px-4">
            <h2 className="text-fluid-5xl text-white sm:text-fluid-6xl md:text-fluid-7xl font-bold">{siteConfig.process.sectionTitle}</h2>
            <p className="text-[#DBA800] text-fluid-xl sm:text-fluid-2xl md:text-fluid-3xl opacity-80">{siteConfig.process.sectionDescription}</p>
          </div>

          {/* Right column: Cards - full width on mobile */}
          <AnimatedList
            items={steps.map((st: ProcessStep) => (
              <SpotlightCard key={st.id} className="card-item border-y sm:border border-white/10 sm:rounded-2xl shadow-sm aspect-[4/3] sm:aspect-3/2 flex flex-col justify-between relative overflow-hidden">
                {/* Background image */}
                <Image
                  src={st.image}
                  alt={st.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                  quality={70}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/70"></div>
                
                {/* Content */}
                <div className="relative z-10 p-5 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center h-full">
                  {/* Number badge - top right corner */}
                  <span className="absolute -top-2 -right-2 sm:top-2 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#DBA800] rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm md:text-base shadow-lg">{st.number}</span>
                  
                  {/* Title */}
                  <h3 className="text-white text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase mb-3 sm:mb-3 md:mb-4">{st.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-sm sm:text-sm md:text-base lg:text-lg max-w-md">{st.description}</p>
                </div>
              </SpotlightCard>
            ))}
            showGradients={false}
            displayScrollbar={false}
            className="w-screen sm:w-auto -ml-[calc((100vw-100%)/2)] sm:ml-0"
            itemClassName="mb-6 sm:mb-16 md:mb-32"
          />
        </div>
      </div>
    </section>
  );
}