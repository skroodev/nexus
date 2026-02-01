import React from 'react';
import { siteConfig } from '../../lib/config';
import Image from 'next/image';

export default function ProjetsPage() {
  const projects = siteConfig.projects.featured;

  return (
    <main className="min-h-screen bg-[#1C1C1C] pt-20 sm:pt-24">
      <div className="max-w-fluid mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-fluid-4xl sm:text-fluid-5xl md:text-fluid-6xl font-bold text-white mb-4 sm:mb-6">
            {siteConfig.projects.sectionTitle}
          </h1>
          <p className="text-fluid-base sm:text-fluid-lg md:text-fluid-xl text-gray-400 max-w-2xl">
            {siteConfig.projects.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group rounded-xl sm:rounded-2xl overflow-hidden bg-[#2a2a2a] border border-white/10 hover:border-primary/50 transition-all duration-300"
            >
              <div className="grid grid-cols-2 gap-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.before}
                    alt={`${project.title} - Avant`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <span className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-black/70 text-white text-fluid-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                    Avant
                  </span>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.after}
                    alt={`${project.title} - Après`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <span className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-primary/90 text-black text-fluid-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium">
                    Après
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <span className="text-primary text-fluid-xs sm:text-fluid-sm font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <h2 className="text-fluid-lg sm:text-fluid-xl md:text-fluid-2xl font-semibold text-white mt-1 sm:mt-2 mb-2 sm:mb-3">
                  {project.title}
                </h2>
                <p className="text-fluid-sm sm:text-fluid-base text-gray-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
