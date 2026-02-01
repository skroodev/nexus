import dynamic from 'next/dynamic';
import HeroSection from '../components/sections/HeroSection';
import FadeContent from '../components/FadeContent';
import React from 'react';

// Lazy load sections below the fold
const ServicesSection = dynamic(() => import('../components/sections/ServicesSection'), {
  loading: () => <div className="min-h-screen" />,
});
const ProcessSection = dynamic(() => import('../components/sections/ProcessSection'), {
  loading: () => <div className="min-h-screen" />,
});
const ProjectsSection = dynamic(() => import('../components/sections/ProjectsSection'), {
  loading: () => <div className="min-h-screen" />,
});
const ContactSection = dynamic(() => import('../components/sections/ContactSection'), {
  loading: () => <div className="min-h-screen" />,
});

export default function Page() {
	return (
		<>
			<FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0}>
				<HeroSection />
			</FadeContent>
			<main className="py-12">
				<FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0} delay={0.2}>
					<ServicesSection />
				</FadeContent>
				<FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0} delay={0.4}>
					<ProcessSection />
				</FadeContent>
				<FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0} delay={0.6}>
					<ProjectsSection />
				</FadeContent>
				<FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0} delay={0.8}>
					<ContactSection />
				</FadeContent>
			</main>
		</>
	)
}