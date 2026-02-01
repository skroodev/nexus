"use client";

import React from 'react'
import { siteConfig } from '../../lib/config'

export default function ContactSection() {
  const contact = siteConfig.contact
  const form = contact.form

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#1C1C1C]">
      <div className="max-w-fluid mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-fluid-5xl sm:text-fluid-6xl md:text-fluid-7xl font-bold text-white">
            {contact.sectionTitle}
          </h2>
          <p className="text-fluid-xl sm:text-fluid-2xl md:text-fluid-3xl text-[#DBA800] opacity-80 max-w-3xl">
            {contact.sectionDescription}
          </p>
        </div>

        {/* Contact Form - 2 columns */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {form.fields.map((f: { name: string; label: string; type: string; required?: boolean; options?: string[]; placeholder?: string }) => (
              <div 
                key={f.name} 
                className={f.type === 'textarea' ? 'sm:col-span-2' : ''}
              >
                <label 
                  htmlFor={`contact-${f.name}`} 
                  className="block text-gray-400 text-fluid-xs sm:text-fluid-sm mb-1.5 sm:mb-2"
                >
                  {f.label} {f.required && <span className="text-primary">*</span>}
                </label>
                {f.type === 'textarea' ? (
                  <textarea 
                    id={`contact-${f.name}`}
                    name={f.name}
                    required={f.required} 
                    placeholder={f.placeholder}
                    className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-fluid-sm sm:text-fluid-base text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors min-h-28 sm:min-h-32 resize-none" 
                  />
                ) : f.type === 'select' ? (
                  <select 
                    id={`contact-${f.name}`}
                    name={f.name}
                    required={f.required} 
                    className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-fluid-sm sm:text-fluid-base text-white focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="">Sélectionner...</option>
                    {f.options?.map((o: string) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                ) : (
                  <input 
                    type={f.type} 
                    id={`contact-${f.name}`}
                    name={f.name}
                    placeholder={f.placeholder ?? ''} 
                    required={f.required} 
                    className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-fluid-sm sm:text-fluid-base text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors" 
                  />
                )}
              </div>
            ))}
            <div className="sm:col-span-2 pt-2">
              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-black font-medium py-3 sm:py-4 rounded-lg transition-colors text-fluid-sm sm:text-fluid-base"
              >
                {form.submitButton}
              </button>
              <p className="text-gray-500 text-fluid-xs sm:text-fluid-sm text-center pt-4">
                {form.legal}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
