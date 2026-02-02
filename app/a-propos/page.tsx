"use client";

import React from 'react';
import { siteConfig, TeamMember } from '../../lib/config';
import ChromaGrid, { ChromaItem } from '../../components/ChromaGrid';

// Transformer les données de l'équipe pour ChromaGrid
const teamMembers: ChromaItem[] = siteConfig.team.members.map((member: TeamMember) => ({
  image: member.image,
  title: member.name,
  subtitle: member.role,
  handle: member.department,
  borderColor: member.borderColor,
  gradient: member.gradient,
}));

// Fonction pour remplacer les variables dans les textes
const replaceVariables = (text: string) => {
  return text
    .replace(/{founded}/g, String(siteConfig.identity.founded))
    .replace(/{businessName}/g, siteConfig.identity.businessName)
    .replace(/{teamSize}/g, String(siteConfig.identity.teamSize))
    .replace(/{projectsCompleted}/g, String(siteConfig.identity.projectsCompleted));
};

export default function AProposPage() {
  const identity = siteConfig.identity;
  const about = siteConfig.about;
  const team = siteConfig.team;

  return (
    <main className="min-h-screen bg-[#1C1C1C] pt-20 sm:pt-24">
      <div className="max-w-fluid mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-fluid-4xl sm:text-fluid-5xl md:text-fluid-6xl font-bold text-white mb-4 sm:mb-6">
            {about.pageTitle}
          </h1>
          <p className="text-fluid-base sm:text-fluid-lg md:text-fluid-xl text-gray-400 max-w-2xl">
            {identity.description}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-16">
          <div className="bg-[#2a2a2a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
            <div className="text-fluid-3xl sm:text-fluid-4xl font-bold text-primary mb-1 sm:mb-2">{identity.yearsInBusiness}+</div>
            <div className="text-fluid-xs sm:text-fluid-sm text-gray-400">{identity.statsLabels.yearsLabel}</div>
          </div>
          <div className="bg-[#2a2a2a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
            <div className="text-fluid-3xl sm:text-fluid-4xl font-bold text-primary mb-1 sm:mb-2">{identity.projectsCompleted}+</div>
            <div className="text-fluid-xs sm:text-fluid-sm text-gray-400">{identity.statsLabels.projectsLabel}</div>
          </div>
          <div className="bg-[#2a2a2a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
            <div className="text-fluid-3xl sm:text-fluid-4xl font-bold text-primary mb-1 sm:mb-2">{identity.teamSize}</div>
            <div className="text-fluid-xs sm:text-fluid-sm text-gray-400">{identity.statsLabels.teamLabel}</div>
          </div>
          <div className="bg-[#2a2a2a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
            <div className="text-fluid-3xl sm:text-fluid-4xl font-bold text-primary mb-1 sm:mb-2">{identity.founded}</div>
            <div className="text-fluid-xs sm:text-fluid-sm text-gray-400">{identity.statsLabels.foundedLabel}</div>
          </div>
        </div>

        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12">
          <h2 className="text-fluid-xl sm:text-fluid-2xl font-semibold text-white mb-4 sm:mb-6">{about.history.title}</h2>
          {about.history.paragraphs.map((paragraph: string, index: number) => (
            <p key={index} className={`text-fluid-sm sm:text-fluid-base text-gray-400 leading-relaxed ${index < about.history.paragraphs.length - 1 ? 'mb-4' : ''}`}>
              {replaceVariables(paragraph)}
            </p>
          ))}
        </div>

        {/* Team Section */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-fluid-3xl sm:text-fluid-4xl md:text-fluid-5xl font-bold text-white mb-4">
              {team.sectionTitle}
            </h2>
            <p className="text-fluid-base sm:text-fluid-lg text-gray-400 max-w-2xl">
              {team.sectionDescription}
            </p>
          </div>
          <div className="min-h-[500px] sm:min-h-[550px]">
            <ChromaGrid items={teamMembers} radius={280} />
          </div>
        </div>
      </div>
    </main>
  );
}
