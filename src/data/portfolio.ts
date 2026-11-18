export const profile = {
  professionalName: 'ONEJEYSIR',
  fullName: 'FOKOU JEYSON UDALRIC',
  brand: 'ONEJEYSIRDEV',
  role: 'Développeur Full-Stack en formation',
  descriptor: 'Étudiant en Génie logiciel · Licence, Niveau 3 · ENSPD',
  email: 'jeysonudalric150@gmail.com',
  whatsappNumber: '237654133947',
  whatsappDisplay: '+237 654 133 947',
  quote: 'Je transforme des idées en expériences numériques innovantes.',
  githubUrl: '',
  linkedinUrl: '',
}

export const education = [
  {
    id: 'licence',
    step: '01',
    title: 'Licence · Niveau 3',
    subtitle: 'Génie logiciel · ENSPD',
    note: 'Études en cours',
    current: true,
  },
  {
    id: 'bts',
    step: '02',
    title: 'BTS',
    subtitle: 'Génie logiciel · Cameroun',
    note: 'Diplôme obtenu',
    current: false,
  },
]

export const skillGroups = [
  {
    id: 'frontend',
    number: '01',
    title: 'Frontend',
    note: 'Interfaces & intégration',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    number: '02',
    title: 'Backend',
    note: 'Données & logique serveur',
    skills: ['PHP', 'MySQL', 'Laravel · en apprentissage', 'Node.js · en apprentissage'],
  },
  {
    id: 'programming',
    number: '03',
    title: 'Programmation',
    note: 'Langages',
    skills: ['C', 'JavaScript', 'PHP'],
  },
  {
    id: 'tools',
    number: '04',
    title: 'Outils',
    note: 'Flux de travail',
    skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Composer', 'XAMPP / WAMP'],
  },
]

export type ProjectStatus = 'confirm' | 'concept' | 'building'

export type Project = {
  id: string
  number: string
  name: string
  category: string
  status: ProjectStatus
  statusLabel: string
  introduction: string
  challenge: string
  scope: string[]
  technologies: string[]
  role: string
  visual: 'pixel' | 'tech' | 'transit' | 'portfolio'
  demoUrl?: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    id: 'pixel-play',
    number: '01',
    name: 'PIXEL PLAY',
    category: 'Commerce numérique',
    status: 'confirm',
    statusLabel: 'Statut à confirmer',
    introduction: 'Une plateforme commerciale imaginée pour rassembler jeux vidéo, consoles, ordinateurs et téléphones dans un même catalogue.',
    challenge: 'Enjeu décrit : rendre lisible une offre multi-catégories et guider le visiteur vers une commande via WhatsApp.',
    scope: ['Catalogue de produits', 'Panier', 'Parcours de commande via WhatsApp'],
    technologies: ['React.js', 'JavaScript', 'CSS'],
    role: 'Rôle et périmètre effectivement réalisés à confirmer.',
    visual: 'pixel',
  },
  {
    id: 'onejeys-tech',
    number: '02',
    name: 'ONEJEYSIRTECH',
    category: 'Mise en relation · Douala',
    status: 'concept',
    statusLabel: 'Concept · fonctionnalités envisagées',
    introduction: 'Un projet de plateforme pour rapprocher particuliers et techniciens spécialisés à Douala.',
    challenge: 'Enjeu cible : simplifier la recherche d’un technicien et établir la confiance entre les personnes.',
    scope: ['Comptes clients et techniciens envisagés', 'Recherche & messagerie envisagées', 'Profils, paiements et évaluations envisagés'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    role: 'Projet en conception ; ces fonctionnalités ne sont pas présentées comme opérationnelles.',
    visual: 'tech',
  },
  {
    id: 'lematrans',
    number: '03',
    name: 'LEMA TRANS',
    category: 'Site institutionnel · Cameroun',
    status: 'confirm',
    statusLabel: 'Statut à confirmer',
    introduction: 'Une présence web professionnelle pour LEMATRANS CAMEROUN SARL, entreprise de transit, transport et prestations diverses.',
    challenge: 'Objectif communiqué : présenter les services, renforcer la visibilité numérique et faciliter le contact commercial.',
    scope: ['Présentation des services', 'Information institutionnelle', 'Contact commercial'],
    technologies: [],
    role: 'Périmètre livré et technologies utilisées à confirmer.',
    visual: 'transit',
  },
  {
    id: 'onejeys-portfolio',
    number: '04',
    name: 'ONEJEYSIR PORTFOLIO',
    category: 'Expérience numérique · en cours',
    status: 'building',
    statusLabel: 'En cours',
    introduction: 'Le portfolio ONEJEYSIRDEV lui-même : une expérience éditoriale animée, responsive et enrichie par une scène 3D.',
    challenge: 'Rassembler parcours, technologies et projets dans une signature numérique claire et fidèle.',
    scope: ['Sections éditoriales', 'Scène 3D avec solution de repli', 'Formulaire relié à un backend email à configurer'],
    technologies: ['React', 'TypeScript', 'Three.js', 'Node.js'],
    role: 'Conception et développement du portfolio.',
    visual: 'portfolio',
  },
]

export const services = [
  { id: 'sites', number: '01', title: 'Sites vitrines', text: 'Présenter clairement une activité et faciliter le premier contact.', icon: 'window' },
  { id: 'apps', number: '02', title: 'Applications web', text: 'Structurer des parcours et des outils accessibles depuis le navigateur.', icon: 'app' },
  { id: 'frontend', number: '03', title: 'Intégration frontend', text: 'Transformer une direction visuelle en interface responsive et soignée.', icon: 'frontend' },
  { id: 'backend', number: '04', title: 'Développement backend', text: 'Apprendre à relier logique métier, données et interface.', icon: 'backend' },
  { id: 'platforms', number: '05', title: 'Plateformes numériques', text: 'Explorer des services qui connectent personnes, contenus et outils.', icon: 'platforms' },
  { id: 'solutions', number: '06', title: 'Solutions digitales', text: 'Concevoir une réponse numérique adaptée à un besoin concret.', icon: 'solutions' },
]

export const workSteps = [
  { number: '01', title: 'Discovery', detail: 'Comprendre le besoin et les personnes concernées.' },
  { number: '02', title: 'Planning', detail: 'Organiser le périmètre et les priorités.' },
  { number: '03', title: 'Design', detail: 'Concevoir l’expérience et les états de l’interface.' },
  { number: '04', title: 'Development', detail: 'Développer la solution par étapes.' },
  { number: '05', title: 'Testing', detail: 'Tester les usages et corriger les défauts.' },
  { number: '06', title: 'Deployment', detail: 'Préparer la mise en ligne et sa configuration.' },
]

export const principles = [
  'Apprentissage continu',
  'Innovation utile',
  'Résolution de problèmes',
  'Qualité du code',
  'Créativité',
  'Travail en équipe',
]
