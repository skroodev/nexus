import React from 'react';
import { siteConfig } from '../../lib/config';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const contact = siteConfig.contact;

  return (
    <footer className="bg-[#DBA800] text-black py-8 sm:py-12">
      <div className="max-w-fluid mx-auto px-4 sm:px-6">
        {/* Top section: Logo + Contact Info + Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Logo & Address */}
          <div className="flex flex-col items-center md:items-start">
            <Image 
              src="/images/webp/ateliernexusLogo.webp" 
              alt="Atelier Nexus Logo" 
              width={250} 
              height={50}
              className="w-40 sm:w-48 md:w-56 h-auto"
            />
            <div className="text-fluid-sm text-black/80 mt-3 text-center md:text-left">
              {siteConfig.identity.address}
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-fluid-base mb-3">Contact</h4>
            <div className="space-y-2">
              <a 
                href={`tel:${contact.infoBlock.phone}`} 
                className="block text-fluid-sm text-black/80 hover:text-black transition-colors"
              >
                {contact.infoBlock.phone}
              </a>
              <a 
                href={`mailto:${contact.infoBlock.email}`} 
                className="block text-fluid-sm text-black/80 hover:text-black transition-colors break-all"
              >
                {contact.infoBlock.email}
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-fluid-base mb-3">Horaires</h4>
            <div className="text-fluid-sm text-black/80">
              {contact.infoBlock.hours}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col items-center md:items-start gap-2">
            <h4 className="font-semibold text-fluid-base mb-1">Navigation</h4>
            {siteConfig.footer?.navigation?.map((n) => (
              <Link 
                key={n.href} 
                href={n.href} 
                className="text-fluid-sm text-black/80 hover:text-black transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom: Credit */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-black/20 text-fluid-xs text-center text-black/60">
          {siteConfig.footer?.credit ?? 'skroo.dev'}
        </div>
      </div>
    </footer>
  );
}
