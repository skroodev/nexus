/**
 * ============================================================================
 * 🎨 CONFIGURATION PRINCIPALE DU SITE - TEMPLATE ATELIER NEXUS
 * ============================================================================
 * 
 * Ce fichier centralise TOUTES les données du site.
 * Pour personnaliser le site pour un client, modifiez uniquement ce fichier.
 * 
 * STRUCTURE :
 * 1. IMAGES - Pool d'images du site
 * 2. IDENTITY - Informations de l'entreprise
 * 3. COLORS - Palette de couleurs
 * 4. TYPOGRAPHY - Polices de caractères
 * 5. NAVIGATION - Menu et liens
 * 6. HERO - Section héro de la page d'accueil
 * 7. SERVICES - Services proposés
 * 8. PROCESS - Étapes du processus
 * 9. PROJECTS - Portfolio et projets
 * 10. TEAM - Équipe et membres
 * 11. ABOUT - Page À Propos
 * 12. CONTACT - Formulaire et coordonnées
 * 13. FOOTER - Pied de page
 * 
 * ============================================================================
 */

// =============================================================================
// 📸 POOL D'IMAGES
// =============================================================================
// Ajoutez ici toutes les images du site (format recommandé : webp)
// Ces images seront utilisées dans les projets, services, hero, etc.

const imagePool = [
  '/images/webp/772b6f1ef75f43111e003bcda5ebb13996f2fcaf.webp',
  '/images/webp/774470d714dea91c9f834611e459220175a1010a.webp',
  '/images/webp/7ecadc16c19679e0e66562504fa02803156d8a48.webp',
  '/images/webp/888cba52b79042ba28d59e56c914ab1629d7ddb2.webp',
  '/images/webp/921f2ff088f5edbf7a091f06fa41477c647f235b.webp',
  '/images/webp/9f3032eaa2ed27361e33e975bbb568da1f69d8bd.webp',
  '/images/webp/b3ab73528f8c050162d845febe5539828690e2e5.webp',
  '/images/webp/d318f0d940bc1f030008bbadaa661fd66fb5978e.webp',
  '/images/webp/eb463842a0eeaba9f4d8c8a3e87a84f4558090ce.webp',
  '/images/webp/eb802c647a3c65e7bbe5140c289b913ca4c6a798.webp',
  '/images/webp/f4e879b6d2c33989c7391c1b49798c33a0b6ad35.webp',
];

// =============================================================================
// 🏢 CONFIGURATION PRINCIPALE
// =============================================================================

export const siteConfig = {
  
  // ===========================================================================
  // 🏷️ IDENTITÉ DE L'ENTREPRISE
  // ===========================================================================
  // Informations générales sur l'entreprise (nom, contact, statistiques)
  
  identity: {
    // Nom complet de l'entreprise (utilisé dans le header, footer, SEO)
    businessName: 'ATELIER NEXUS',
    
    // Version courte du nom (pour les espaces restreints)
    businessNameShort: 'NEXUS',
    
    // Slogan / accroche principale
    tagline: "Aménagement Intérieur Haut de Gamme • Côte d'Azur",
    
    // Description SEO et présentation
    description:
      "Studio d'aménagement intérieur basé à Antibes. Transformation d'espaces professionnels, résidentiels et commerciaux avec expertise locale et design contemporain.",
    
    // Coordonnées
    phone: '+33 (0)4 92 97 XX XX',
    email: 'contact@ateliernexus.fr',
    address: '55 Avenue de Cannes, 06160 Antibes, France',
    
    // Zones de service (pour le SEO local)
    serviceAreas: ["Provence-Alpes-Côte d'Azur", "Île-de-France", 'France'],
    
    // Statistiques clés (affichées sur la page À Propos et Hero)
    founded: 1998,           // Année de fondation
    yearsInBusiness: 25,     // Années d'expérience
    teamSize: 35,            // Nombre d'employés
    projectsCompleted: 400,  // Nombre de projets réalisés
    
    // Labels pour les statistiques (utilisés dans Hero et À Propos)
    statsLabels: {
      yearsLabel: "Années d'expertise",
      projectsLabel: 'Projets réalisés',
      teamLabel: 'Experts passionnés',
      foundedLabel: 'Fondation',
    },
  },

  // ===========================================================================
  // 🔍 SEO ET MÉTADONNÉES
  // ===========================================================================
  // Configuration pour le référencement et les balises meta
  
  seo: {
    // URL de base du site (sans slash final)
    siteUrl: 'https://ateliernexus.fr',
    
    // Titre par défaut des pages (template: "Page | {siteName}")
    defaultTitle: "Atelier Nexus | Aménagement Intérieur Haut de Gamme - Côte d'Azur",
    titleTemplate: '%s | Atelier Nexus',
    
    // Description par défaut (Google affiche ~155 caractères)
    defaultDescription: "Studio d'aménagement intérieur basé à Antibes. Transformation d'espaces professionnels, résidentiels et commerciaux avec expertise locale et design contemporain.",
    
    // Mots-clés (moins importants qu'avant mais toujours utiles)
    keywords: [
      'aménagement intérieur', 
      'design intérieur', 
      'Antibes', 
      "Côte d'Azur", 
      'bureau', 
      'résidentiel', 
      'commercial', 
      'rénovation', 
      'PACA'
    ],
    
    // Open Graph (réseaux sociaux)
    og: {
      title: 'Atelier Nexus | Aménagement Intérieur Haut de Gamme',
      description: "Studio d'aménagement intérieur basé à Antibes. Transformation d'espaces professionnels, résidentiels et commerciaux.",
      locale: 'fr_FR',
      type: 'website' as const,
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image' as const,
      title: 'Atelier Nexus | Aménagement Intérieur',
      description: "Studio d'aménagement intérieur haut de gamme sur la Côte d'Azur",
    },
  },

  // ===========================================================================
  // 🎨 PALETTE DE COULEURS
  // ===========================================================================
  // Modifiez ces couleurs pour adapter le thème au client
  // Format : code hexadécimal (#RRGGBB)
  
  colors: {
    // Couleur principale (boutons, accents, liens actifs)
    primary: '#DBA800',        // Or / Corn
    primaryLight: '#F0C419',   // Or clair (hover)
    
    // Couleurs secondaires
    secondary: '#4D4D4D',      // Gris foncé
    
    // Arrière-plans
    background: '#1C1C1C',     // Fond principal (très sombre)
    backgroundAlt: '#2a2a2a',  // Fond alternatif (cartes, sections)
    surface: '#808080',        // Surface (éléments interactifs)
    
    // Textes
    text: '#FFFFFF',           // Texte principal (blanc)
    textMuted: '#B3B3B3',      // Texte secondaire (gris clair)
    textLight: '#808080',      // Texte léger (gris)
    
    // Bordures
    border: '#4D4D4D',         // Bordure par défaut
    borderLight: 'rgba(255,255,255,0.1)', // Bordure subtile
    
    // Accents et états
    accent: '#8B1538',         // Accent secondaire (bordeaux)
    success: '#00A19A',        // Succès (teal)
    error: '#8B1538',          // Erreur (bordeaux)
    notification: '#DBA800',   // Notifications (or)
  },

  // ===========================================================================
  // 🎭 DESIGN DES SECTIONS
  // ===========================================================================
  // Personnalisez l'apparence de chaque section (backgrounds, effets)
  // Les gradients subtils créent une hiérarchie visuelle premium
  
  sectionDesign: {
    // Section Services
    services: {
      // Gradient radial subtil avec accent doré
      background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(219,168,0,0.08) 0%, transparent 50%), #1C1C1C',
      // Ou couleur unie : '#1C1C1C'
    },
    
    // Section Process/Méthodologie  
    process: {
      // Fond légèrement plus clair pour contraste
      background: 'linear-gradient(180deg, #1C1C1C 0%, #1f1f1f 50%, #1C1C1C 100%)',
    },
    
    // Section Projets/Portfolio
    projects: {
      // Gradient subtil vers le bas avec teinte dorée
      background: 'linear-gradient(180deg, #1C1C1C 0%, #1a1917 100%)',
    },
    
    // Section Contact
    contact: {
      // Fond plus sombre pour ancrer la page
      background: 'linear-gradient(180deg, #1C1C1C 0%, #141414 100%)',
    },
    
    // Séparateur entre sections (ligne décorative optionnelle)
    separator: {
      enabled: true,
      style: 'gradient', // 'gradient' | 'line' | 'none'
      color: 'linear-gradient(90deg, transparent 0%, rgba(219,168,0,0.3) 50%, transparent 100%)',
      height: '1px',
    },
  },

  // ===========================================================================
  // ✏️ TYPOGRAPHIE
  // ===========================================================================
  // Polices de caractères (doivent être importées dans layout.tsx)
  
  typography: {
    bodyFont: 'Inter',              // Police du corps de texte
    headingFont: 'Playfair Display', // Police des titres
  },

  // ===========================================================================
  // 🧭 NAVIGATION
  // ===========================================================================
  // Menu principal et bouton d'appel à l'action
  
  navigation: {
    // Logo du header (chemin vers image)
    logo: '/images/webp/ateliernexusLogo.webp',
    logoWhite: '/images/webp/logo-nx-white.webp',  // Version blanche pour fond sombre
    logoAlt: 'Atelier Nexus Logo',
    
    // Liens du menu principal
    items: [
      { label: 'Nos Services', href: '/nos-services' },
      { label: 'Projets', href: '/projets' },
      { label: 'Blog', href: '/blog' },
      { label: 'À Propos', href: '/a-propos' },
      { label: 'Contact', href: '/contact' },
    ],
    
    // Bouton CTA du header
    ctaButton: { 
      text: 'Consultation Gratuite', 
      href: '/contact' 
    },
  },

  // ===========================================================================
  // 🦸 SECTION HERO (Page d'accueil)
  // ===========================================================================
  // Grande section d'introduction en haut de la page d'accueil
  
  hero: {
    // Titre principal (H1)
    headline: "Vos Espaces Rêvés, Réalisés sur la Côte d'Azur",
    
    // Sous-titre
    subheadline:
      'Design innovant et savoir-faire local pour bureaux, résidences et commerces. Expertise depuis 1998.',
    
    // Bouton principal
    ctaButton: { 
      text: 'Découvrir nos Projets', 
      href: '/projets' 
    },
    
    // Image de fond (poster pour la vidéo)
    backgroundImage: imagePool[0],
    backgroundImagePool: imagePool, // Pool pour rotation client-side si besoin
    
    // Vidéo de fond (optionnel)
    video: {
      enabled: true,
      src: '/images/webm/hero-video.webm',
      type: 'video/webm',
    },
    
    // Badge d'accroche (bandeau de statistiques)
    badge: { 
      show: true, 
      text: "25+ ans d'expertise  •  400+ projets  •  PACA & Île-de-France" 
    },
  },

  // ===========================================================================
  // 🛠️ SERVICES
  // ===========================================================================
  // Liste des services proposés par l'entreprise
  
  services: {
    // Titre de la section
    sectionTitle: 'Nos Spécialités',
    sectionDescription: "Des solutions adaptées à chaque type d'espace",
    
    // Liste des services
    items: [
      {
        id: 'service-1-offices',
        title: 'Bureaux & Espaces Professionnels',
        shortDescription: 'PME, startups, agences',
        description:
          "Création d'espaces de travail modernes, productifs et accueillants. Design ergonomique, matériaux premium, zones de collaboration.",
        image: '/images/webp/888cba52b79042ba28d59e56c914ab1629d7ddb2.webp',
        icon: 'briefcase',
        ctaText: 'Voir nos bureaux',
        href: '/nos-services/bureaux',
      },
      {
        id: 'service-2-residential',
        title: 'Résidentiel Premium',
        shortDescription: 'Villas & appartements',
        description:
          "Aménagements sur-mesure pour villas et appartements haut de gamme. Design contemporain, matériaux nobles, confort et élégance.",
        image: '/images/webp/eb802c647a3c65e7bbe5140c289b913ca4c6a798.webp',
        icon: 'home',
        ctaText: 'Voir nos résidences',
        href: '/nos-services/residences',
      },
      {
        id: 'service-3-commercial',
        title: 'Commerces & Hôtellerie',
        shortDescription: 'Restaurants, boutiques, hôtels',
        description:
          "Création d'ambiances signature pour restaurants, boutiques et hôtels. Identité visuelle forte, expérience client mémorable.",
        image: '/images/webp/f4e879b6d2c33989c7391c1b49798c33a0b6ad35.webp',
        icon: 'store',
        ctaText: 'Voir nos commerces',
        href: '/nos-services/commerces',
      },
    ],
  },

  // ===========================================================================
  // 🖼️ GALERIES DE SERVICES
  // ===========================================================================
  // Images pour les pages galeries de chaque service
  
  galleries: {
    bureaux: {
      title: 'Nos Réalisations Bureaux',
      description: "Découvrez nos aménagements d'espaces professionnels : bureaux modernes, open-spaces, salles de réunion et espaces de coworking.",
      ctaText: 'Vous avez un projet de bureau ? Parlons-en.',
      images: [
        { src: '/images/webp/888cba52b79042ba28d59e56c914ab1629d7ddb2.webp', height: 450 },
        { src: '/images/webp/772b6f1ef75f43111e003bcda5ebb13996f2fcaf.webp', height: 350 },
        { src: '/images/webp/774470d714dea91c9f834611e459220175a1010a.webp', height: 420 },
        { src: '/images/webp/7ecadc16c19679e0e66562504fa02803156d8a48.webp', height: 380 },
        { src: '/images/webp/921f2ff088f5edbf7a091f06fa41477c647f235b.webp', height: 400 },
        { src: '/images/webp/9f3032eaa2ed27361e33e975bbb568da1f69d8bd.webp', height: 360 },
        { src: '/images/webp/b3ab73528f8c050162d845febe5539828690e2e5.webp', height: 440 },
        { src: '/images/webp/d318f0d940bc1f030008bbadaa661fd66fb5978e.webp', height: 370 },
        { src: '/images/webp/eb463842a0eeaba9f4d8c8a3e87a84f4558090ce.webp', height: 410 },
        { src: '/images/webp/eb802c647a3c65e7bbe5140c289b913ca4c6a798.webp', height: 390 },
        { src: '/images/webp/f4e879b6d2c33989c7391c1b49798c33a0b6ad35.webp', height: 430 },
      ],
    },
    residences: {
      title: 'Nos Réalisations Résidentielles',
      description: "Explorez nos projets résidentiels haut de gamme : villas, appartements et demeures d'exception.",
      ctaText: 'Envie de transformer votre intérieur ? Contactez-nous.',
      images: [
        { src: '/images/webp/eb802c647a3c65e7bbe5140c289b913ca4c6a798.webp', height: 450 },
        { src: '/images/webp/9f3032eaa2ed27361e33e975bbb568da1f69d8bd.webp', height: 380 },
        { src: '/images/webp/d318f0d940bc1f030008bbadaa661fd66fb5978e.webp', height: 420 },
        { src: '/images/webp/eb463842a0eeaba9f4d8c8a3e87a84f4558090ce.webp', height: 350 },
        { src: '/images/webp/772b6f1ef75f43111e003bcda5ebb13996f2fcaf.webp', height: 400 },
        { src: '/images/webp/24246951be5009f0d0643286dc648ec200eef8d9.webp', height: 360 },
        { src: '/images/webp/2a318f287c3b415b53e7b5548d7d954efd65374d.webp', height: 430 },
        { src: '/images/webp/774470d714dea91c9f834611e459220175a1010a.webp', height: 390 },
        { src: '/images/webp/7ecadc16c19679e0e66562504fa02803156d8a48.webp', height: 410 },
        { src: '/images/webp/888cba52b79042ba28d59e56c914ab1629d7ddb2.webp', height: 370 },
        { src: '/images/webp/921f2ff088f5edbf7a091f06fa41477c647f235b.webp', height: 440 },
      ],
    },
    commerces: {
      title: 'Nos Réalisations Commerciales',
      description: "Parcourez nos créations pour restaurants, boutiques et hôtels : des espaces uniques.",
      ctaText: 'Prêt à créer une expérience client unique ?',
      images: [
        { src: '/images/webp/f4e879b6d2c33989c7391c1b49798c33a0b6ad35.webp', height: 450 },
        { src: '/images/webp/2a318f287c3b415b53e7b5548d7d954efd65374d.webp', height: 380 },
        { src: '/images/webp/7ecadc16c19679e0e66562504fa02803156d8a48.webp', height: 400 },
        { src: '/images/webp/921f2ff088f5edbf7a091f06fa41477c647f235b.webp', height: 350 },
        { src: '/images/webp/b3ab73528f8c050162d845febe5539828690e2e5.webp', height: 420 },
        { src: '/images/webp/d318f0d940bc1f030008bbadaa661fd66fb5978e.webp', height: 360 },
        { src: '/images/webp/24246951be5009f0d0643286dc648ec200eef8d9.webp', height: 430 },
        { src: '/images/webp/772b6f1ef75f43111e003bcda5ebb13996f2fcaf.webp', height: 390 },
        { src: '/images/webp/774470d714dea91c9f834611e459220175a1010a.webp', height: 410 },
        { src: '/images/webp/888cba52b79042ba28d59e56c914ab1629d7ddb2.webp', height: 370 },
        { src: '/images/webp/eb802c647a3c65e7bbe5140c289b913ca4c6a798.webp', height: 440 },
      ],
    },
  },

  // ===========================================================================
  // 📋 PROCESSUS / MÉTHODOLOGIE
  // ===========================================================================
  // Étapes du processus de travail
  
  process: {
    sectionTitle: 'Notre Démarche',
    sectionDescription: 'Du diagnostic à la livraison : un accompagnement complet',
    sectionText: 
      "Chaque projet mérite une approche sur-mesure et rigoureuse. Notre méthodologie éprouvée garantit une transformation harmonieuse de vos espaces, de la première consultation à la remise des clés. Transparence, excellence et respect de vos attentes à chaque étape.",
    
    // Étapes du processus
    steps: [
      { 
        id: 'step-1', 
        number: '01', 
        title: 'Diagnostic & Écoute', 
        description: 'Rencontre, évaluation des besoins, compréhension de votre vision. Consultation gratuite 30 min.',
        image: '/images/webp/888cba52b79042ba28d59e56c914ab1629d7ddb2.webp',
      },
      { 
        id: 'step-2', 
        number: '02', 
        title: 'Concept & Design', 
        description: 'Création de plans 3D, selection matériaux, budget définitif. Validation de votre approbation.',
        image: '/images/webp/eb802c647a3c65e7bbe5140c289b913ca4c6a798.webp',
      },
      { 
        id: 'step-3', 
        number: '03', 
        title: 'Fabrication', 
        description: 'Menuiserie sur-mesure, commandes matériaux, coordination des artisans. Suivi rigoureux.',
        image: '/images/webp/f4e879b6d2c33989c7391c1b49798c33a0b6ad35.webp',
      },
      { 
        id: 'step-4', 
        number: '04', 
        title: 'Installation & Livraison', 
        description: 'Pose, finitions, nettoyage, formation. Remise des clés avec satisfaction garantie.',
        image: '/images/webp/9f3032eaa2ed27361e33e975bbb568da1f69d8bd.webp',
      },
    ],
  },

  // ===========================================================================
  // 🖼️ PROJETS / PORTFOLIO
  // ===========================================================================
  // Projets réalisés avec photos avant/après
  
  projects: {
    sectionTitle: 'Notre Portfolio',
    sectionDescription: '400+ projets réalisés en 25 ans',
    
    // Labels pour les images avant/après
    beforeLabel: 'Avant',
    afterLabel: 'Après',
    
    // Bouton vers la page complète
    ctaButton: { 
      text: 'Voir tous les Projets', 
      href: '/projets' 
    },
    
    // Catégories de filtrage
    // id: identifiant interne, label: texte affiché
    categories: [
      { id: 'all', label: 'Tous' },
      { id: 'offices', label: 'Bureaux' },
      { id: 'residential', label: 'Résidentiel' },
      { id: 'commercial', label: 'Commerces' },
    ],
    
    // Correspondance catégorie ID -> catégorie affichée dans les projets
    categoryMapping: {
      'offices': 'Bureaux',
      'residential': 'Résidentiel',
      'commercial': 'Commerces',
    } as Record<string, string>,
    
    // Liste des projets
    featured: [
      { 
        id: 'project-1', 
        title: 'Bureau Startup Paris', 
        category: 'Bureaux', 
        before: imagePool[0], 
        after: imagePool[1], 
        description: "Transformation complète d'un espace startup de 200m². Design épuré, zones collaboration, confort acoustique." 
      },
      { 
        id: 'project-2', 
        title: 'Villa Contemporaine Antibes', 
        category: 'Résidentiel', 
        before: imagePool[2], 
        after: imagePool[3], 
        description: "Villa de luxe : séjour, cuisine ouverte, chambres. Matériaux nobles, vue panoramique préservée." 
      },
      { 
        id: 'project-3', 
        title: 'Restaurant Gastronomique Nice', 
        category: 'Commerces', 
        before: imagePool[4], 
        after: imagePool[5], 
        description: "Restaurant 5 étoiles : ambiance sophistiquée, cuisine ouverte, salle privée. Identité visuelle forte." 
      },
      { 
        id: 'project-4', 
        title: 'Agence Digitale Cannes', 
        category: 'Bureaux', 
        before: imagePool[6], 
        after: imagePool[7], 
        description: "Agence 150m² : open-space, bureaux privés, zone lounge. Design moderne et fonctionnel." 
      },
      { 
        id: 'project-5', 
        title: 'Boutique de Mode Cannes', 
        category: 'Commerces', 
        before: imagePool[8], 
        after: imagePool[9], 
        description: "Boutique de prêt-à-porter haut de gamme 80m². Espaces d'exposition élégants, cabines d'essayage luxueuses, éclairage sur mesure." 
      },
      { 
        id: 'project-6', 
        title: 'Appartement Familial Monaco', 
        category: 'Résidentiel', 
        before: imagePool[10], 
        after: imagePool[0], 
        description: "Rénovation complète d'un appartement 120m² : salon lumineux, cuisine équipée, 3 chambres. Optimisation des espaces et rangements intégrés." 
      },
    ],
  },

  // ===========================================================================
  // 👥 ÉQUIPE
  // ===========================================================================
  // Membres de l'équipe affichés sur la page À Propos
  
  team: {
    sectionTitle: "L'équipe Nexus",
    sectionDescription: 'Des experts passionnés à votre service pour transformer vos espaces.',
    
    // Liste des membres
    // borderColor & gradient : utilisés par le composant ChromaGrid
    members: [
      {
        id: 'team-1',
        name: 'Jean Delacroix',
        role: 'Directeur Artistique',
        department: 'Direction créative',
        image: '/images/webp/avatar-jean.webp',
        borderColor: '#DBA800',
        gradient: 'linear-gradient(145deg, #DBA800, #1C1C1C)',
      },
      {
        id: 'team-2',
        name: 'Marie Fontaine',
        role: "Architecte d'Intérieur",
        department: 'Conception & Design',
        image: '/images/webp/avatar-marie.webp',
        borderColor: '#DBA800',
        gradient: 'linear-gradient(210deg, #DBA800, #1C1C1C)',
      },
      {
        id: 'team-3',
        name: 'Pierre Marchand',
        role: 'Chef de Projet',
        department: 'Coordination & Suivi',
        image: '/images/webp/avatar-pierre.webp',
        borderColor: '#DBA800',
        gradient: 'linear-gradient(165deg, #DBA800, #1C1C1C)',
      },
    ],
  },

  // ===========================================================================
  // ℹ️ PAGE À PROPOS
  // ===========================================================================
  // Contenu de la page À Propos
  
  about: {
    // Titre de la page
    pageTitle: 'À Propos',
    
    // Section "Notre Histoire"
    history: {
      title: 'Notre Histoire',
      // Les paragraphes utilisent des variables qui seront remplacées dynamiquement :
      // {founded}, {businessName}, {teamSize}, {projectsCompleted}
      paragraphs: [
        "Depuis {founded}, {businessName} s’est imposé comme une référence de l’aménagement intérieur haut de gamme sur la Côte d’Azur, en accompagnant la transformation d’espaces pour des clients exigeants, de la première esquisse jusqu’à la livraison finale. Au fil des années, notre équipe de {teamSize} experts passionnés a développé une vision commune : concevoir des lieux élégants, durables et parfaitement adaptés aux usages de celles et ceux qui les vivent au quotidien.",
        "Avec plus de {projectsCompleted} projets réalisés, nous avons construit une expertise solide dans la création d’espaces professionnels, résidentiels et commerciaux qui allient esthétique, fonctionnalité et confort. Plateaux de bureaux, villas contemporaines, hôtels, boutiques ou restaurants : chaque projet est pensé comme une réponse sur-mesure, où la lumière, les matières, les volumes et la circulation sont travaillés dans le détail pour donner du sens à chaque mètre carré.",
        "Basés à Antibes, nous intervenons sur l’ensemble de la Côte d’Azur et ses environs, en privilégiant une approche fondée sur l’écoute, le dialogue et la co-construction avec nos clients. Notre rôle est de vous guider à chaque étape – conception, choix des matériaux, coordination des artisans, suivi de chantier – afin de garantir des espaces aboutis, maîtrisés dans le temps et pensés pour durer. Plus qu’un simple studio d’aménagement, {businessName} se veut un partenaire de confiance pour imaginer et réaliser des lieux qui racontent votre histoire et reflètent votre identité.",
      ],
    },
    
    // Statistiques : utilisez identity.statsLabels pour les labels
  },

  // ===========================================================================
  // 📞 CONTACT
  // ===========================================================================
  // Page et formulaire de contact
  
  contact: {
    sectionTitle: 'Parlons de Votre Projet',
    sectionDescription: 'Consultation gratuite, sans engagement. Rencontre ou appel vidéo.',
    
    // Bloc d'informations de contact
    infoBlock: { 
      phone: '+33 (0)4 92 97 XX XX', 
      email: 'contact@ateliernexus.fr', 
      address: '55 Avenue de Cannes, 06160 Antibes', 
      hours: 'Lun–Ven 9h–18h • Sam sur rendez-vous' 
    },
    
    // Labels pour l'affichage
    labels: {
      phone: 'Téléphone',
      email: 'Email',
      address: 'Adresse',
      hours: 'Horaires',
      coordinates: 'Coordonnées',
      requestConsultation: 'Demander une consultation',
    },
    
    // Configuration du formulaire
    form: {
      fields: [
        { name: 'firstName', label: 'Prénom', type: 'text', required: true },
        { name: 'lastName', label: 'Nom', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Téléphone', type: 'tel', required: false },
        { 
          name: 'projectType', 
          label: "Type d'espace", 
          type: 'select', 
          options: ['Bureau / Professionnel', 'Résidentiel / Villa', 'Commerce / Hôtel', 'Autre'], 
          required: true 
        },
        { name: 'location', label: 'Localisation', type: 'text', placeholder: 'Ville / Région', required: false },
        { 
          name: 'budget', 
          label: 'Budget estimé', 
          type: 'select', 
          options: ['Moins de 15k€', '15k – 50k€', '50k – 100k€', '100k+€'], 
          required: false 
        },
        { name: 'message', label: 'Votre projet', type: 'textarea', required: true },
      ],
      selectPlaceholder: 'Sélectionner...',
      submitButton: 'Demander une Consultation',
      legal: "En soumettant ce formulaire, j'accepte la Politique de Confidentialité.",
      successMessage: 'Merci ! Nous vous contactons rapidement.',
    },
  },

  // ===========================================================================
  // 🦶 FOOTER (Pied de page)
  // ===========================================================================
  
  footer: {
    // Logo du footer (peut être différent du header)
    logo: '/images/webp/ateliernexusLogo.webp',
    logoAlt: 'Atelier Nexus Logo',
    
    // Navigation du footer
    navigation: [
      { label: 'Nos Services', href: '/nos-services' },
      { label: 'Projets', href: '/projets' },
      { label: 'À Propos', href: '/a-propos' },
      { label: 'Contact', href: '/contact' },
    ],
    
    // Réseaux sociaux
    social: [
      { name: 'instagram', url: 'https://instagram.com/ateliernexus' },
      { name: 'linkedin', url: 'https://linkedin.com/company/ateliernexus' },
    ],
    
    // Contact dans le footer
    contact: { 
      phone: '+33 (0)4 92 97 XX XX', 
      email: 'contact@ateliernexus.fr', 
      address: 'Antibes, Alpes-Maritimes' 
    },
    
    // Liens légaux
    legal: [
      { label: 'Politique de Confidentialité', href: '/mentions-legales/privacy' },
      { label: "Conditions d'Utilisation", href: '/mentions-legales/terms' },
      { label: 'Mentions Légales', href: '/mentions-legales' },
    ],
    
    // Crédit (lien vers le développeur)
    credit: {
      text: 'Design & développement par',
      author: 'skroo.dev',
      url: 'https://www.linkedin.com/in/skroodev/',
    },
    
    // Labels
    labels: {
      contact: 'Contact',
      hours: 'Horaires',
      navigation: 'Navigation',
    },
  },
};

// =============================================================================
// 📦 TYPES EXPORTÉS
// =============================================================================
// Types utiles pour l'autocomplétion dans les composants

export type SiteConfig = typeof siteConfig;
export type TeamMember = typeof siteConfig.team.members[number];
export type Project = typeof siteConfig.projects.featured[number];
export type Service = typeof siteConfig.services.items[number];
export type ProcessStep = typeof siteConfig.process.steps[number];
export type FormField = typeof siteConfig.contact.form.fields[number];
export type ProjectCategory = typeof siteConfig.projects.categories[number];
export type NavItem = typeof siteConfig.navigation.items[number];
export type FooterNavItem = typeof siteConfig.footer.navigation[number];
