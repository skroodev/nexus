"use client";
import React from 'react';
import Link from 'next/link';

type Item = { label: string; href: string };

export default function StaggeredMenu({ items, cta }: { items: Item[]; cta: { text: string; href: string } }) {
	return (
		<div className="hidden md:flex items-center gap-6">
			<div className="flex gap-6 items-center">
				{items.map((it, idx) => (
					<Link
						key={it.href}
						href={it.href}
						className="text-sm text-gray-700 hover:underline opacity-0 transform translate-y-2"
						style={{ animation: `staggerFade 320ms ease forwards ${idx * 80}ms` }}
					>
						{it.label}
					</Link>
				))}
			</div>
			<Link
				href={cta.href}
				className="ml-4 inline-block bg-primary text-white px-4 py-2 rounded-full text-sm opacity-0 transform translate-y-2"
				style={{ animation: `staggerFade 320ms ease forwards ${items.length * 80}ms` }}
			>
				{cta.text}
			</Link>

			<style jsx>{`
				@keyframes staggerFade {
					from { opacity: 0; transform: translateY(8px); }
					to { opacity: 1; transform: translateY(0); }
				}
			`}</style>
		</div>
	);
}
