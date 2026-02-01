"use client";

import React from 'react';
import { siteConfig } from '../../lib/config';

export default function AProposPage() {
  const identity = siteConfig.identity;

  return (
    <main className="min-h-screen bg-[#1C1C1C] pt-20 sm:pt-24">
      <div className="max-w-fluid mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-fluid-4xl sm:text-fluid-5xl md:text-fluid-6xl font-bold text-white mb-4 sm:mb-6">
            À Propos
          </h1>
          <p className="text-fluid-base sm:text-fluid-lg md:text-fluid-xl text-gray-400 max-w-2xl">
            {identity.description}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-16">
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

        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12">
          <h2 className="text-fluid-xl sm:text-fluid-2xl font-semibold text-white mb-4 sm:mb-6">Notre Histoire</h2>
          <p className="text-fluid-sm sm:text-fluid-base text-gray-400 leading-relaxed mb-4">
            Depuis {identity.founded}, {identity.businessName} s'est imposé comme une référence 
            dans l'aménagement intérieur haut de gamme sur la Côte d'Azur. Notre équipe de {identity.teamSize} experts 
            passionnés transforme vos espaces en lieux d'exception.
          </p>
          <p className="text-fluid-sm sm:text-fluid-base text-gray-400 leading-relaxed">
            Avec plus de {identity.projectsCompleted} projets réalisés, nous avons développé une expertise unique 
            dans la création d'espaces professionnels, résidentiels et commerciaux qui allient esthétique, 
            fonctionnalité et durabilité.
          </p>
        </div>
      </div>
    </main>
  );
}
