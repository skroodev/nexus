"use client";

import { useEffect, useRef } from 'react';
import { siteConfig } from '../../lib/config';
import SpotlightCard from '../SpotlightCard';
import ScrollReveal from '../ScrollReveal';
import AnimatedList from '../AnimatedList';
import Image from 'next/image';

// Images pour les cards process
const processImages = [
  '/images/webp/888cba52b79042ba28d59e56c914ab1629d7ddb2.webp',
  '/images/webp/eb802c647a3c65e7bbe5140c289b913ca4c6a798.webp',
  '/images/webp/f4e879b6d2c33989c7391c1b49798c33a0b6ad35.webp',
  '/images/webp/9f3032eaa2ed27361e33e975bbb568da1f69d8bd.webp',
];

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
    <section ref={sectionRef} className="relative">
      {/* ScrollReveal section - pinned with scroll animation */}
      <ScrollReveal
        textClassName="text-white text-fluid-lg sm:text-fluid-xl md:text-fluid-2xl leading-relaxed max-w-4xl text-left"
      >
        {siteConfig.process.sectionText}
      </ScrollReveal>

      {/* Process steps section */}
      <div className="py-8 sm:py-12 md:py-16 max-w-fluid mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 min-h-[60vh] sm:min-h-[80vh]">
          {/* Left column: Sticky title and description */}
          <div ref={leftRef} className="lg:sticky lg:top-1/2 lg:-translate-y-1/2 lg:self-start mb-8 sm:mb-16 md:mb-24">
            <h2 className="text-fluid-5xl text-white sm:text-fluid-6xl md:text-fluid-7xl font-bold opacity-0 -translate-x-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-x-0">{siteConfig.process.sectionTitle}</h2>
            <p className="text-[#DBA800] text-fluid-xl sm:text-fluid-2xl md:text-fluid-3xl opacity-0 -translate-x-8 transition-all duration-700 ease-out delay-150 [&.animate-in]:opacity-80 [&.animate-in]:translate-x-0">{siteConfig.process.sectionDescription}</p>
          </div>

          {/* Right column: Cards */}
          <AnimatedList
            items={steps.map((st, index) => (
              <SpotlightCard key={st.id} className="card-item border border-white/10 rounded-xl sm:rounded-2xl shadow-sm aspect-square flex flex-col justify-between relative overflow-hidden">
                {/* Background image */}
                <Image
                  src={processImages[index % processImages.length]}
                  alt={st.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                  quality={70}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/75"></div>
                
                {/* Content */}
                <div className="relative z-10 p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center h-full">
                  {/* Number badge - top right */}
                  <span className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#DBA800] rounded-full flex items-center justify-center text-black font-bold text-sm sm:text-base md:text-lg">{st.number}</span>
                  
                  {/* Title */}
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase mb-2 sm:mb-3 md:mb-4 px-2">{st.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg px-2">{st.description}</p>
                </div>
              </SpotlightCard>
            ))}
            showGradients={false}
            displayScrollbar={false}
            className=""
            itemClassName="mb-8 sm:mb-16 md:mb-32"
          />
        </div>
      </div>
    </section>
  );
}