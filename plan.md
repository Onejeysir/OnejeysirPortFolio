# Plan — ONEJEYSIRDEV

## Portée et principes de vérité

Créer un portfolio mono-page, responsive et interactif pour FOKOU JEYSON UDALRIC (ONEJEYSIR / ONEJEYSIRDEV), étudiant en Licence Niveau 3 en Génie logiciel à l’ENSPD et titulaire d’un BTS en Génie logiciel obtenu au Cameroun. Le site le présente comme développeur en formation, jamais comme diplômé ingénieur ou développeur Full-Stack senior. Aucun client, emploi, certification, URL GitHub/LinkedIn, photographie, chiffre d’impact ou statut de réalisation non communiqué ne sera inventé.

Les contenus identifient les technologies en apprentissage (Laravel, Node.js) et les autres éléments comme technologies et outils mentionnés dans le brief, sans jauges de maîtrise. PIXEL PLAY et LEMATRANS restent au statut « état à confirmer » tant que leur livraison n’est pas vérifiable ; ONEJEYSIRTECH est présenté comme un concept / projet en développement avec des fonctionnalités envisagées ; ce portfolio est indiqué en cours. Les fiches resteront modifiables par données et n’afficheront de liens de démo ou de dépôt que lorsqu’ils auront été fournis.

La photo professionnelle est un emplacement vide et clairement remplaçable par l’utilisateur, sans portrait généré. L’URL de production, les liens GitHub/LinkedIn, les captures de projets et le statut réel de chaque projet restent des entrées à confirmer/configurer. Les visuels de projets ne seront pas déguisés en captures d’écran réelles.

Le formulaire aura un endpoint backend véritable (validation serveur, honeypot et limitation de débit) utilisant un transport SMTP réel via Nodemailer et des variables d’environnement. Aucun message « envoyé » ne sera affiché si l’envoi n’a pas réellement réussi. Le service nécessite SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS et MAIL_TO ; sans ces informations, le site explique que le canal email n’est pas encore configuré. Les identifiants ne seront jamais intégrés au code client. La limitation de débit initiale en mémoire protège chaque processus, pas un déploiement distribué multi-instances.

## Direction artistique

Aucune liste d’esthétiques alternative n’est proposée : le brief utilisateur a déjà fixé une direction nette, futuriste/minimaliste/premium, sa palette graphite, anthracite, blanc cassé, gris métallique, crème et orange mesuré, ainsi que l’objectif d’immersion 3D.

- **Mouvement de design :** édition typographique technologique, entre signalétique architecturale suisse et interface de studio WebGL contemporain ; une mise en page asymétrique, tendue et très lisible.
- **Principes :** hiérarchie typographique expressive ; espace négatif et contraste discipliné ; orange réservé aux actions et repères actifs ; mouvement déclenché par l’intention, jamais décoratif au détriment de la lecture.
- **Philosophie couleur :** le graphite évoque l’atelier numérique, l’ivoire apporte chaleur et contraste, l’acier structure les surfaces ; un orange propriétaire évoque l’énergie créative et guide les gestes sans envahir l’écran.
- **Paradigme de mise en page :** composition éditoriale décentrée à larges marges, colonnes décalées, repères verticaux et fiches de projets horizontales ; les sections ne sont pas enfermées dans une grille de cartes centrée uniforme.
- **Signatures visuelles :** un monogramme angulaire « O/J » tracé comme une trajectoire de circuit ; un objet 3D filaire/verre fumé à facettes autour d’un noyau orange ; des index de section et filets fins façon plans techniques.
- **Interaction :** survols sobres avec profondeur légère, navigation tactile simple, boutons à état clair ; curseur personnalisé uniquement sur dispositif à pointeur précis ; tous les parcours restent utilisables au clavier et sans WebGL.
- **Animation :** apparition typographique courte et décalée ; translation/profondeur à faible amplitude ; scène 3D lente et réactive au pointeur avec intensité plafonnée ; révélation au scroll non bloquante ; aucune animation essentielle au contenu, réduction globale via `prefers-reduced-motion` et commande de pause ; désactivation/allègement sur mobile et repli si WebGL échoue.
- **Typographie :** « Space Grotesk » pour les titres et « Inter » pour l’interface et le texte courant ; titre hero monumental mais fluide (`clamp`), intertitres compacts, corps de texte confortable, libellés techniques en chasse fixe uniquement pour les métadonnées. Repli système si les polices distantes sont indisponibles.
- **Essence de marque :** un portfolio d’étudiant camerounais en génie logiciel qui relie apprentissage rigoureux, développement web et goût pour les expériences numériques interactives. Trois adjectifs : précis, curieux, créatif.
- **Voix :** directe, concrète, confiante sans surpromesse. Exemples : « J’apprends en construisant. » et « Des idées claires. Des interfaces utiles. »
- **Mot-symbole :** ONEJEYSIR en capitales dessinées par espacement et coupes angulaires, avec un symbole O/J géométrique dérivé de deux tracés continus ; ONEJEYSIRDEV en signature secondaire.
- **Couleur de marque :** orange ambre vif `#FF6B35`, appliqué parcimonieusement sur graphite `#111210`, avec blanc cassé `#F2F0E9` et acier `#888A84`.

## Architecture et flux

Application React + TypeScript + Vite, avec Node/Express pour l’endpoint email. Le projet est mono-page (`/`) avec navigation par ancres ; Vite fournit l’interface de développement et le serveur Express sert `dist` et `/api/contact` en production. Le client ne dépend pas de réponses fictives. Les métadonnées et un contenu sémantique utile figureront aussi dans le HTML initial ; les balises canonical/OG absolues et le sitemap public dépendront de `PUBLIC_SITE_URL` configuré à partir du vrai domaine, jamais de l’hôte interne de Preview.

- **Frontend :** React, TypeScript, Vite, CSS modulaire/adaptatif, Framer Motion pour les animations ciblées, Three.js/React Three Fiber/Drei pour une sculpture géométrique légère avec repli CSS. Icônes SVG locales (pas de polices d’icônes lourdes).
- **Backend :** Express, Zod pour la validation, Nodemailer pour le SMTP, limite de débit et honeypot. Endpoint POST `/api/contact` renvoie des erreurs explicites et n’accuse réception qu’après confirmation d’envoi du transport.
- **SEO et qualité :** document HTML sémantique, titres/méta/OG/Twitter, données structurées Person cohérentes avec les faits connus, favicon conçu pour ONEJEYSIRDEV, `robots.txt`, sitemap construit uniquement depuis un domaine canonique configuré, politique de réduction des animations, navigation clavier et contrastes adaptés.
- **Déploiement :** build client `dist`, serveur Node sur `PORT` ou 3000, valeurs SMTP uniquement dans les secrets runtime. Le README documentera installation, variables, vérification SMTP, test local, build et déploiement. Aucun courriel de test ne sera envoyé sans accord explicite sur la configuration de destination.

## Structure de fichiers proposée

```text
onejeys/
├── index.html                 # métadonnées et repli sémantique initial
├── public/                    # favicon, robots.txt, manifeste et ressources statiques
├── src/
│   ├── app/                   # App, navigation, configuration et styles globaux
│   ├── components/            # boutons, conteneurs, curseur, primitives réutilisables
│   ├── sections/              # Hero, À propos, Stack, Projets, Services, Processus, Vision, Contact
│   ├── scenes/                # scène R3F isolée et son repli non-WebGL
│   ├── data/                  # contenu et fiches projet éditables
│   ├── hooks/                 # visibilité scroll, mouvement réduit, pointeur
│   ├── lib/                   # utilitaires UI et validation des formulaires
│   └── styles/                # tokens, responsive, animations et accessibilité
├── server/                    # Express, contact, validation, envoi SMTP, anti-abus
├── .env.example              # noms de paramètres seulement, aucune valeur secrète
├── package.json / pnpm-lock.yaml
├── pnpm-workspace.yaml        # permissions d’installation de scripts évaluées
├── README.md
├── TODO.md
└── plan.md
```

## Décisions restant à fournir pour une finition exacte

Le développement peut commencer sans bloquer sur ces éléments en conservant des placeholders honnêtes : photographie de profil ; URL GitHub et LinkedIn ; URL/dépôt/captures réelles des projets ; confirmation du statut de PIXEL PLAY et LEMATRANS ; vrai domaine public ; paramètres du fournisseur SMTP. Le formulaire et le sitemap ne seront qualifiés d’opérationnels sur le domaine public qu’après ces configurations et une vérification effective.
