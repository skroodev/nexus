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
]

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const pickTwo = (arr: string[]) => {
  const a = pick(arr);
  let b = pick(arr);
  let attempts = 0;
  while (b === a && attempts < 10) {
    b = pick(arr);
    attempts++;
  }
  return [a, b];
}

export const siteConfig = {
  identity: {
    businessName: 'ATELIER NEXUS',
    businessNameShort: 'NEXUS',
    tagline: "Aménagement Intérieur Haut de Gamme • Côte d'Azur",
    description:
      "Studio d'aménagement intérieur basé à Antibes. Transformation d'espaces professionnels, résidentiels et commerciaux avec expertise locale et design contemporain.",
    phone: '+33 (0)4 92 97 XX XX',
    email: 'contact@ateliernexus.fr',
    address: '55 Avenue de Cannes, 06160 Antibes, France',
    serviceAreas: ["Provence-Alpes-Côte d'Azur", "Île-de-France", 'France'],
    founded: 1998,
    yearsInBusiness: 25,
    teamSize: 35,
    projectsCompleted: 400,
  },

  colors: {
    primary: '#DBA800', // Corn (Or)
    primaryLight: '#F0C419', // Lighter Corn
    secondary: '#4D4D4D', // Tundora
    background: '#1C1C1C', // Cod Gray
    backgroundAlt: '#4D4D4D', // Tundora
    surface: '#808080', // Gray
    text: '#B3B3B3', // Nobel
    textLight: '#808080', // Gray
    border: '#4D4D4D', // Tundora
    accent: '#8B1538', // Deep Burgundy
    metallic: '#B87333', // Bronze
    flash: '#00A19A', // Transformative Teal - NOUVEAU
    flashAlt: '#D4006F', // Vibrant Magenta - NOUVEAU
    success: '#00A19A', // Teal
    error: '#8B1538', // Deep Burgundy
    notification: '#DBA800', // Corn
  },

  typography: {
    bodyFont: 'Inter',
    headingFont: 'Playfair Display',
  },

  navigation: {
    logo: 'ATELIER NEXUS',
    items: [
      { label: 'Nos Services', href: '/nos-services' },
      { label: 'Projets', href: '/projets' },
      { label: 'À Propos', href: '/a-propos' },
      { label: 'Contact', href: '/contact' },
    ],
    ctaButton: { text: 'Consultation Gratuite', href: '/contact' },
  },

  hero: {
    headline: "Vos Espaces Rêvés, Réalisés sur la Côte d'Azur",
    subheadline:
      'Design innovant et savoir-faire local pour bureaux, résidences et commerces. Expertise depuis 1998.',
    ctaButton: { text: 'Découvrir nos Projets', href: '/projets' },
    backgroundImage: imagePool[0], // Use first image to avoid hydration mismatch
    backgroundImagePool: imagePool, // Pool available for client-side rotation if needed
    badge: { show: true, text: "25+ ans d'expertise  •  400+ projets  •   PACA & Île-de-France" },
  },
  services: {
    sectionTitle: 'Nos Spécialités',
    sectionDescription: "Des solutions adaptées à chaque type d'espace",
    items: [
      {
        id: 'service-1-offices',
        title: 'Bureaux & Espaces Professionnels',
        shortDescription: 'PME, startups, agences',
        description:
          "Création d'espaces de travail modernes, productifs et accueillants. Design ergonomique, matériaux premium, zones de collaboration.",
        image: '/images/webp/888cba52b79042ba28d59e56c914ab1629d7ddb2.webp',
        icon: 'briefcase',
        color: '#DBA800',
        ctaText: 'Voir nos bureaux',
      },
      {
        id: 'service-2-residential',
        title: 'Résidentiel Premium',
        shortDescription: 'Villas & appartements',
        description:
          "Aménagements sur-mesure pour villas et appartements haut de gamme. Design contemporain, matériaux nobles, confort et élégance.",
        image: '/images/webp/eb802c647a3c65e7bbe5140c289b913ca4c6a798.webp',
        icon: 'home',
        color: '#DBA800',
        ctaText: 'Voir nos résidences',
      },
      {
        id: 'service-3-commercial',
        title: 'Commerces & Hôtellerie',
        shortDescription: 'Restaurants, boutiques, hôtels',
        description:
          "Création d'ambiances signature pour restaurants, boutiques et hôtels. Identité visuelle forte, expérience client mémorable.",
        image: '/images/webp/f4e879b6d2c33989c7391c1b49798c33a0b6ad35.webp',
        icon: 'store',
        color: '#DBA800',
        ctaText: 'Voir nos commerces',
      },
    ],
  },
  process: {
    sectionTitle: 'Notre Démarche',
    sectionDescription: 'Du diagnostic à la livraison : un accompagnement complet',
    sectionText: "Chaque projet mérite une approche sur-mesure et rigoureuse. Notre méthodologie éprouvée garantit une transformation harmonieuse de vos espaces, de la première consultation à la remise des clés. Transparence, excellence et respect de vos attentes à chaque étape.",

    steps: [
      { id: 'step-1', number: '01', title: 'Diagnostic & Écoute', description: 'Rencontre, évaluation des besoins, compréhension de votre vision. Consultation gratuite 30 min.' },
      { id: 'step-2', number: '02', title: 'Concept & Design', description: 'Création de plans 3D, selection matériaux, budget définitif. Validation de votre approbation.' },
      { id: 'step-3', number: '03', title: 'Fabrication', description: 'Menuiserie sur-mesure, commandes matériaux, coordination des artisans. Suivi rigoureux.' },
      { id: 'step-4', number: '04', title: 'Installation & Livraison', description: 'Pose, finitions, nettoyage, formation. Remise des clés avec satisfaction garantie.' },
    ],
  },
  projects: {
    sectionTitle: 'Notre Portfolio',
    sectionDescription: '400+ projets réalisés en 25 ans',
    ctaButton: { text: 'Voir tous les Projets', href: '/projets' },
    categories: [
      { id: 'all', label: 'Tous' },
      { id: 'offices', label: 'Bureaux' },
      { id: 'residential', label: 'Résidentiel' },
      { id: 'commercial', label: 'Commerces' },
    ],
    featured: (() => {
      // Use fixed pairs to avoid hydration mismatch (no random selection)
      const pairs = [
        [imagePool[0], imagePool[1]],
        [imagePool[2], imagePool[3]],
        [imagePool[4], imagePool[5]],
        [imagePool[6], imagePool[7]],
        [imagePool[8], imagePool[9]],
        [imagePool[10], imagePool[0]],
      ];
      return [
        { id: 'project-1', title: 'Bureau Startup Paris', category: 'Bureaux', before: pairs[0][0], after: pairs[0][1], description: "Transformation complète d'un espace startup de 200m². Design épuré, zones collaboration, confort acoustique." },
        { id: 'project-2', title: 'Villa Contemporaine Antibes', category: 'Résidentiel', before: pairs[1][0], after: pairs[1][1], description: "Villa de luxe : séjour, cuisine ouverte, chambres. Matériaux nobles, vue panoramique préservée." },
        { id: 'project-3', title: 'Restaurant Gastronomique Nice', category: 'Commerces', before: pairs[2][0], after: pairs[2][1], description: "Restaurant 5 étoiles : ambiance sophistiquée, cuisine ouverte, salle privée. Identité visuelle forte." },
        { id: 'project-4', title: 'Agence Digitale Cannes', category: 'Bureaux', before: pairs[3][0], after: pairs[3][1], description: "Agence 150m² : open-space, bureaux privés, zone lounge. Design moderne et fonctionnel." },
        { 
  id: 'project-5', 
  title: 'Boutique de Mode Cannes', 
  category: 'Commerces', 
  before: pairs[4][0], 
  after: pairs[4][1], 
  description: "Boutique de prêt-à-porter haut de gamme 80m². Espaces d'exposition élégants, cabines d'essayage luxueuses, éclairage sur mesure." 
},
{ 
  id: 'project-6', 
  title: 'Appartement Familial Monaco', 
  category: 'Résidentiel', 
  before: pairs[5][0], 
  after: pairs[5][1], 
  description: "Rénovation complète d'un appartement 120m² : salon lumineux, cuisine équipée, 3 chambres. Optimisation des espaces et rangements intégrés." 
}
      ]
    })(),
  },
  contact: {
    sectionTitle: 'Parlons de Votre Projet',
    sectionDescription: 'Consultation gratuite, sans engagement. Rencontre ou appel vidéo.',
    infoBlock: { phone: '+33 (0)4 92 97 XX XX', email: 'contact@ateliernexus.fr', address: '55 Avenue de Cannes, 06160 Antibes', hours: 'Lun–Ven 9h–18h • Sam sur rendez-vous' },
    form: {
      fields: [
        { name: 'firstName', label: 'Prénom', type: 'text', required: true },
        { name: 'lastName', label: 'Nom', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Téléphone', type: 'tel', required: false },
        { name: 'projectType', label: "Type d'espace", type: 'select', options: ["Bureau / Professionnel", 'Résidentiel / Villa', 'Commerce / Hôtel', 'Autre'], required: true },
        { name: 'location', label: 'Localisation', type: 'text', placeholder: 'Ville / Région', required: false },
        { name: 'budget', label: 'Budget estimé', type: 'select', options: ['Moins de 15k€', '15k – 50k€', '50k – 100k€', '100k+€'], required: false },
        { name: 'message', label: 'Votre projet', type: 'textarea', required: true },
      ],
      submitButton: 'Demander une Consultation',
      legal: "En soumettant ce formulaire, j'accepte la Politique de Confidentialité.",
      successMessage: 'Merci ! Nous vous contactons rapidement.',
    },
  },
  footer: {
    navigation: [
      { label: 'Nos Services', href: '/nos-services' },
      { label: 'Projets', href: '/projets' },
      { label: 'À Propos', href: '/a-propos' },
      { label: 'Contact', href: '/contact' },
    ],
    social: [ { name: 'instagram', url: 'https://instagram.com/ateliernexus' }, { name: 'linkedin', url: 'https://linkedin.com/company/ateliernexus' } ],
    contact: { phone: '+33 (0)4 92 97 XX XX', email: 'contact@ateliernexus.fr', address: 'Antibes, Alpes-Maritimes' },
    legal: [ { label: 'Politique de Confidentialité', href: '/mentions-legales/privacy' }, { label: 'Conditions d\'Utilisation', href: '/mentions-legales/terms' }, { label: 'Mentions Légales', href: '/mentions-legales' } ],
    credit: 'Design & développement par skroo.dev',
  },
};
