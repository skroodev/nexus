import React from 'react';
import { siteConfig, FooterNavItem } from '../../lib/config';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const contact = siteConfig.contact;
  const footer = siteConfig.footer;

  return (
    <footer className="bg-[#DBA800] text-black py-8 sm:py-12">
      <div className="max-w-fluid mx-auto px-4 sm:px-6">
        {/* Top section: Logo + Contact Info + Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Logo & Address */}
          <div className="flex flex-col items-center md:items-start">
            <Image 
              src={footer.logo} 
              alt={footer.logoAlt} 
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
            <h4 className="font-semibold text-fluid-base mb-3">{footer.labels.contact}</h4>
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
            <h4 className="font-semibold text-fluid-base mb-3">{footer.labels.hours}</h4>
            <div className="text-fluid-sm text-black/80">
              {contact.infoBlock.hours}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col items-center md:items-start gap-2">
            <h4 className="font-semibold text-fluid-base mb-1">{footer.labels.navigation}</h4>
            {footer.navigation.map((n: FooterNavItem) => (
              <Link 
                key={n.href} 
                href={n.href} 
                className="relative text-fluid-sm text-black/80 hover:text-black transition-colors group"
              >
                {n.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black/80 transition-all duration-300 ease-out group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom: Credit */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-black/20 text-fluid-xs text-center text-black/60">
          {footer.credit.text}{' '}
          <a 
            href={footer.credit.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-black transition-colors"
          >
            {footer.credit.author}
          </a>
        </div>
      </div>
    </footer>
  );
}
