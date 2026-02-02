"use client";

import React from 'react';
import { siteConfig, FormField } from '../../lib/config';

export default function ContactPage() {
  const contact = siteConfig.contact;

  return (
    <main className="min-h-screen bg-[#1C1C1C] pt-20 sm:pt-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-fluid mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-14 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <span className="inline-block text-primary text-fluid-sm font-medium uppercase tracking-widest mb-3">
            Contact
          </span>
          <h1 className="text-fluid-3xl sm:text-fluid-4xl md:text-fluid-5xl font-bold text-white mb-3 sm:mb-4">
            {contact.sectionTitle}
          </h1>
          <p className="text-fluid-base sm:text-fluid-lg text-gray-400 max-w-xl mx-auto">
            {contact.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10">
          {/* Contact Info - Left Column */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6">
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {/* Phone Card */}
              <a 
                href={`tel:${contact.infoBlock.phone}`}
                className="group bg-gradient-to-br from-[#2a2a2a] to-[#222] border border-white/10 hover:border-primary/50 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-500 text-fluid-xs mb-1">{contact.labels.phone}</div>
                    <div className="text-white font-medium group-hover:text-primary transition-colors">
                      {contact.infoBlock.phone}
                    </div>
                  </div>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href={`mailto:${contact.infoBlock.email}`}
                className="group bg-gradient-to-br from-[#2a2a2a] to-[#222] border border-white/10 hover:border-primary/50 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-500 text-fluid-xs mb-1">{contact.labels.email}</div>
                    <div className="text-white font-medium group-hover:text-primary transition-colors break-all">
                      {contact.infoBlock.email}
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Address & Hours Card */}
            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#222] border border-white/10 rounded-xl p-5 sm:p-6">
              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-500 text-fluid-xs mb-1">{contact.labels.address}</div>
                    <div className="text-white">{contact.infoBlock.address}</div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-500 text-fluid-xs mb-1">{contact.labels.hours}</div>
                    <div className="text-white">{contact.infoBlock.hours}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium text-fluid-sm">Consultation gratuite</div>
                  <div className="text-gray-400 text-fluid-xs">Sans engagement • Réponse sous 24h</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-primary rounded-full"></div>
                <h2 className="text-fluid-lg sm:text-fluid-xl font-semibold text-white">
                  {contact.labels.requestConsultation}
                </h2>
              </div>
              
              <form className="space-y-4 sm:space-y-5">
                {/* Name Fields Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contact.form.fields.slice(0, 2).map((field: FormField) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="block text-gray-400 text-fluid-xs sm:text-fluid-sm mb-2">
                        {field.label} {field.required && <span className="text-primary">*</span>}
                      </label>
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        className="w-full bg-[#1C1C1C]/80 border border-white/10 rounded-lg px-4 py-3 text-fluid-sm text-white placeholder-gray-600 focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all"
                        placeholder={field.placeholder || field.label}
                      />
                    </div>
                  ))}
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contact.form.fields.slice(2, 4).map((field: FormField) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="block text-gray-400 text-fluid-xs sm:text-fluid-sm mb-2">
                        {field.label} {field.required && <span className="text-primary">*</span>}
                      </label>
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        className="w-full bg-[#1C1C1C]/80 border border-white/10 rounded-lg px-4 py-3 text-fluid-sm text-white placeholder-gray-600 focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all"
                        placeholder={field.placeholder || field.label}
                      />
                    </div>
                  ))}
                </div>

                {/* Select Fields Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contact.form.fields.filter((f: FormField) => f.type === 'select').map((field: FormField) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="block text-gray-400 text-fluid-xs sm:text-fluid-sm mb-2">
                        {field.label} {field.required && <span className="text-primary">*</span>}
                      </label>
                      <select
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        className="w-full bg-[#1C1C1C]/80 border border-white/10 rounded-lg px-4 py-3 text-fluid-sm text-white focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em' }}
                      >
                        <option value="">{contact.form.selectPlaceholder}</option>
                        {field.options?.map((opt: string) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                {/* Location Field */}
                {contact.form.fields.find((f: FormField) => f.name === 'location') && (
                  <div>
                    <label htmlFor="location" className="block text-gray-400 text-fluid-xs sm:text-fluid-sm mb-2">
                      Localisation
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="w-full bg-[#1C1C1C]/80 border border-white/10 rounded-lg px-4 py-3 text-fluid-sm text-white placeholder-gray-600 focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all"
                      placeholder="Ville / Région"
                    />
                  </div>
                )}

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-gray-400 text-fluid-xs sm:text-fluid-sm mb-2">
                    Votre projet <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-[#1C1C1C]/80 border border-white/10 rounded-lg px-4 py-3 text-fluid-sm text-white placeholder-gray-600 focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all resize-none"
                    placeholder="Décrivez votre projet, vos besoins et vos attentes..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-black font-semibold py-3.5 sm:py-4 rounded-xl transition-all duration-300 text-fluid-sm sm:text-fluid-base shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {contact.form.submitButton}
                </button>

                {/* Legal Text */}
                <p className="text-gray-500 text-fluid-xs text-center pt-1">
                  {contact.form.legal}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
