"use client";

import React from 'react';
import { siteConfig } from '../../lib/config';

export default function ContactPage() {
  const contact = siteConfig.contact;

  return (
    <main className="min-h-screen bg-[#1C1C1C] pt-20 sm:pt-24">
      <div className="max-w-fluid mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-fluid-4xl sm:text-fluid-5xl md:text-fluid-6xl font-bold text-white mb-4 sm:mb-6">
            {contact.sectionTitle}
          </h1>
          <p className="text-fluid-base sm:text-fluid-lg md:text-fluid-xl text-gray-400 max-w-2xl">
            {contact.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <div className="bg-[#2a2a2a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
              <h2 className="text-fluid-lg sm:text-fluid-xl font-semibold text-white mb-4 sm:mb-6">Coordonnées</h2>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="text-gray-500 text-fluid-xs sm:text-fluid-sm mb-1">Téléphone</div>
                  <a href={`tel:${contact.infoBlock.phone}`} className="text-fluid-sm sm:text-fluid-base text-white hover:text-primary transition-colors">
                    {contact.infoBlock.phone}
                  </a>
                </div>
                <div>
                  <div className="text-gray-500 text-fluid-xs sm:text-fluid-sm mb-1">Email</div>
                  <a href={`mailto:${contact.infoBlock.email}`} className="text-fluid-sm sm:text-fluid-base text-white hover:text-primary transition-colors break-all">
                    {contact.infoBlock.email}
                  </a>
                </div>
                <div>
                  <div className="text-gray-500 text-fluid-xs sm:text-fluid-sm mb-1">Adresse</div>
                  <div className="text-fluid-sm sm:text-fluid-base text-white">{contact.infoBlock.address}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-fluid-xs sm:text-fluid-sm mb-1">Horaires</div>
                  <div className="text-fluid-sm sm:text-fluid-base text-white">{contact.infoBlock.hours}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#2a2a2a] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
            <h2 className="text-fluid-lg sm:text-fluid-xl font-semibold text-white mb-4 sm:mb-6">Demander une consultation</h2>
            <form className="space-y-3 sm:space-y-4">
              {contact.form.fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-gray-400 text-fluid-xs sm:text-fluid-sm mb-1 sm:mb-2">
                    {field.label} {field.required && <span className="text-primary">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-fluid-sm sm:text-fluid-base text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors min-h-24 sm:min-h-32"
                      placeholder={field.placeholder}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-fluid-sm sm:text-fluid-base text-white focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="">Sélectionner...</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      className="w-full bg-[#1C1C1C] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-fluid-sm sm:text-fluid-base text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-black font-medium py-3 sm:py-4 rounded-lg transition-colors text-fluid-sm sm:text-fluid-base"
              >
                {contact.form.submitButton}
              </button>
              <p className="text-gray-500 text-fluid-xs sm:text-fluid-sm text-center">
                {contact.form.legal}
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
