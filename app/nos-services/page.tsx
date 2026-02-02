"use client";

import React from 'react';
import { siteConfig } from '../../lib/config';
import Image from 'next/image';
import Link from 'next/link';

export default function NosServicesPage() {
  const services = siteConfig.services.items;

  return (
    <main className="min-h-screen bg-[#1C1C1C] pt-20 sm:pt-24">
      <div className="max-w-fluid mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-fluid-4xl sm:text-fluid-5xl md:text-fluid-6xl font-bold text-white mb-4 sm:mb-6">
            {siteConfig.services.sectionTitle}
          </h1>
          <p className="text-fluid-base sm:text-fluid-lg md:text-fluid-xl text-gray-400 max-w-2xl">
            {siteConfig.services.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href || '/contact'}
              className="group rounded-xl sm:rounded-2xl overflow-hidden bg-[#2a2a2a] border border-white/10 hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-4 sm:p-6">
                <span className="text-primary text-fluid-xs sm:text-fluid-sm font-medium uppercase tracking-wider">
                  {service.shortDescription}
                </span>
                <h2 className="text-fluid-lg sm:text-fluid-xl md:text-fluid-2xl font-semibold text-white mt-1 sm:mt-2 mb-2 sm:mb-3">
                  {service.title}
                </h2>
                <p className="text-fluid-sm sm:text-fluid-base text-gray-400 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                  {service.description}
                </p>
                <span className="inline-flex items-center text-fluid-sm sm:text-fluid-base text-primary group-hover:text-primary/80 font-medium transition-colors">
                  {service.ctaText} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
