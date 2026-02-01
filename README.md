# Atelier Nexus - Site Vitrine

Site vitrine haut de gamme pour Atelier Nexus, studio d'aménagement intérieur basé à Antibes (Côte d'Azur).

## 🛠️ Stack Technique

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Animations**: GSAP + Lenis (smooth scroll)
- **Fonts**: Geist Sans, Geist Mono, Inter
- **Déploiement**: Cloudflare Pages (export statique)

## 🚀 Commandes

```bash
# Installer les dépendances
npm install

# Développement local
npm run dev

# Build pour production
npm run build

# Build spécifique Cloudflare Pages
npm run build:cf

# Prévisualiser le build
npm run preview

# Linter
npm run lint
```

## 📁 Structure du Projet

```
├── app/                    # Pages Next.js (App Router)
│   ├── layout.tsx          # Layout racine avec metadata SEO
│   ├── page.tsx            # Page d'accueil
│   ├── sitemap.ts          # Sitemap dynamique
│   ├── a-propos/           # Page À Propos
│   ├── contact/            # Page Contact
│   ├── nos-services/       # Page Services
│   └── projets/            # Page Projets
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Sections de page (Hero, Services, etc.)
│   └── ui/                 # Composants shadcn/ui
├── lib/
│   ├── config.ts           # Configuration centralisée du site
│   └── utils.ts            # Utilitaires (cn, etc.)
├── public/
│   ├── images/             # Images (webp, webm)
│   ├── _headers            # Headers Cloudflare Pages
│   ├── _redirects          # Redirects Cloudflare Pages
│   └── robots.txt          # SEO
└── next.config.ts          # Config Next.js (export statique)
```

## ☁️ Déploiement Cloudflare Pages

### Configuration dans Cloudflare

1. Connecter le repository GitHub/GitLab
2. Configurer le build:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (ou le chemin vers ce projet)
   - **Node.js version**: `20.x`

### Variables d'environnement (si nécessaire)

```
NODE_ENV=production
```

### Notes importantes

- Le projet utilise `output: 'export'` pour générer un site statique
- Les images utilisent `unoptimized: true` car Cloudflare Pages n'a pas de serveur Node.js
- Les fichiers `_headers` et `_redirects` configurent le cache et la sécurité
- Le sitemap et robots.txt sont générés automatiquement

## 🎨 Personnalisation

### Configuration du site

Modifier `lib/config.ts` pour :
- Informations de l'entreprise (nom, adresse, contact)
- Couleurs et typographie
- Contenu des sections (hero, services, processus, projets)
- Navigation et footer

### Couleurs principales

```typescript
colors: {
  primary: '#DBA800',     // Or (Corn)
  secondary: '#4D4D4D',   // Gris foncé (Tundora)
  background: '#1C1C1C',  // Fond sombre (Cod Gray)
  text: '#B3B3B3',        // Texte (Nobel)
}
```

## 📊 Performance

- Score Lighthouse optimisé (90+)
- Images WebP/AVIF optimisées
- Lazy loading des sections below-the-fold
- Cache agressif via headers Cloudflare
- CSS optimisé avec `optimizeCss: true`

## 🔒 Sécurité

Headers de sécurité configurés :
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📝 SEO

- Metadata complète (title, description, keywords)
- Open Graph et Twitter Cards
- Sitemap XML automatique
- robots.txt configuré
- Structured data ready

---

Design & développement par [skroo.dev](https://skroo.dev)

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
