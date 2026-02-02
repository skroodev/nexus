"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { siteConfig } from '../../lib/config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StaggeredMenu: React.ComponentType<any> = dynamic(
  () => import('../StaggeredMenu').then((mod) => mod.default || mod),
  { ssr: true }
);

export default function Header() {
  const navItems = siteConfig.navigation.items.map((it) => ({
    label: it.label,
    link: it.href,
    ariaLabel: it.label
  }));

  const cta = {
    text: siteConfig.navigation.ctaButton.text,
    href: siteConfig.navigation.ctaButton.href
  };

  return (
    <StaggeredMenu
      className="constrained-menu"
      items={navItems}
      cta={cta}
      logoUrl={siteConfig.navigation.logoWhite}
      logoHref="/"
      colors={[siteConfig.colors.primary, siteConfig.colors.secondary]}
      accentColor={siteConfig.colors.primary}
      position="right"
      displaySocials={false}
      isFixed={true}
      closeOnClickAway={true}
      menuButtonColor="#ffffff"
      openMenuButtonColor={siteConfig.colors.secondary}
      changeMenuColorOnOpen={true}
    />
  );
}
