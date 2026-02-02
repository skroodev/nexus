"use client";

import React from 'react';
import { siteConfig } from '../../../lib/config';
import Link from 'next/link';
import Masonry from '../../../components/Masonry';

export default function CommercesPage() {
  const gallery = siteConfig.galleries.commerces;
  
  // Transform gallery images to Masonry format
  const masonryItems = gallery.images.map((image, index) => ({
    id: `commerce-${index}`,
    img: image.src,
    url: image.src,
    height: image.height || 400,
  }));

  return (
    <main className="min-h-screen bg-[#1C1C1C] pt-20 sm:pt-24">
      <div className="max-w-fluid mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10">
        {/* Breadcrumb */}
        <nav className="mb-4 sm:mb-5">
          <ol className="flex items-center gap-2 text-fluid-sm text-gray-400">
            <li>
              <Link href="/nos-services" className="hover:text-primary transition-colors">
                Nos Services
              </Link>
            </li>
            <li>/</li>
            <li className="text-white">{gallery.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-fluid-3xl sm:text-fluid-4xl md:text-fluid-5xl font-bold text-white mb-2 sm:mb-3">
            {gallery.title}
          </h1>
          <p className="text-fluid-sm sm:text-fluid-base text-gray-400 max-w-2xl">
            {gallery.description}
          </p>
        </div>

        {/* Masonry Gallery */}
        <div className="min-h-[500px] md:min-h-[700px]">
          <Masonry
            items={masonryItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.98}
            blurToFocus={true}
          />
        </div>

        {/* CTA */}
        <div className="mt-8 sm:mt-10 text-center">
          <p className="text-fluid-base text-gray-400 mb-4">
            {gallery.ctaText}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </div>
    </main>
  );
}
