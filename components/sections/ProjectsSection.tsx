import React from 'react'
import { siteConfig } from '../../lib/config'
import MagicBento from '../MagicBento'

export default function ProjectsSection() {
  const projects = siteConfig.projects.featured

  // Transform projects data for MagicBento
  const bentoCards = projects.map((p) => ({
    color: 'transparent',
    title: p.title,
    description: p.description,
    label: p.category || 'Projet',
    image: p.after // Utilise l'image "after" du projet depuis config
  }))

  return (
    <section 
      className="py-12 sm:py-16 md:py-24 relative"
      style={{ background: siteConfig.sectionDesign?.projects?.background || '#1C1C1C' }}
    >
      {/* Séparateur en haut */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-fluid mx-auto">
        <div className="mb-8">
          <h2 className="text-fluid-5xl text-white sm:text-fluid-6xl md:text-fluid-7xl font-bold">{siteConfig.projects.sectionTitle}</h2>
          <p className="text-[#DBA800] opacity-80 text-fluid-xl sm:text-fluid-2xl md:text-fluid-3xl mb-4">{siteConfig.projects.sectionDescription}</p>
        </div>
        <div>
          <MagicBento cards={bentoCards} glowColor="218,168,0" enableSpotlight={false} />
        </div>
      </div>
    </section>
  )
}
