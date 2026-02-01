import React from 'react'
import { siteConfig } from '../../lib/config'
import MagicBento from '../MagicBento'

export default function ProjectsSection() {
  const projects = siteConfig.projects.featured

  // Transform projects data for MagicBento
  const bentoCards = projects.map((p, index) => ({
    color: 'transparent',
    title: p.title,
    description: p.description,
    label: p.category || 'Projet',
    image: siteConfig.services.items[index % 3].image // Use existing service images
  }))

  return (
    <section className="py-8 sm:py-12 md:py-16">
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
