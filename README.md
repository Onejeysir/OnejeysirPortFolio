# ONEJEYSIRDEV — Portfolio

Portfolio responsive de Fokou Jeyson Udalric (ONEJEYSIR), étudiant en Licence Niveau 3 en Génie logiciel à l’ENSPD et titulaire d’un BTS en Génie logiciel au Cameroun. L’interface associe React, TypeScript, Vite et une scène Three.js légère à un serveur Express destiné au formulaire de contact.

## Prérequis et installation

Node.js 22.12 ou supérieur et pnpm 11.25.0 sont nécessaires. À la racine du projet :

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env
pnpm dev
```

L’interface de développement écoute le port 3000. Le serveur API écoute le port 3001 et Vite relaie `/api`, `/robots.txt` et `/sitemap.xml`. Sans SMTP configuré, le formulaire le signale et propose le contact WhatsApp ; il ne prétend pas avoir envoyé un email.

## Envoi email réel

Configurer dans `.env` ou dans les variables d’environnement du fournisseur de déploiement `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` et `MAIL_TO`. `MAIL_TO` vaut par défaut l’adresse de contact communiquée, `jeysonudalric150@gmail.com`. `MAIL_FROM` est facultatif ; si le fournisseur SMTP l’autorise, une valeur alignée sur son compte améliore la délivrabilité. Ne jamais inclure ces secrets dans le code frontend ni dans le dépôt.

Après configuration, démarrer l’application et envoyer un message de test volontairement depuis le formulaire ; vérifier sa réception dans la boîte destinataire et ses dossiers de courrier filtré. La réponse de succès n’est produite qu’après l’acceptation de la transmission par le transport SMTP. En production, définir aussi la politique SPF/DKIM/DMARC appropriée chez le fournisseur de domaine.

Le formulaire applique validation frontend et backend, un champ piège anti-robot et une limite de tentatives par adresse réseau dans le processus serveur. La limite est en mémoire : pour un hébergement à plusieurs instances, la remplacer par un stockage partagé.

## Contenu à compléter

Le fichier `src/data/portfolio.ts` rassemble les contenus modifiables. Ajouter uniquement des URL GitHub/LinkedIn ou de démonstration vérifiées, une photo réelle dans l’espace réservé et des confirmations de statut avant d’affirmer qu’un projet est terminé. Les compositions des fiches de projet sont des illustrations, pas des captures des produits. PIXEL PLAY et LEMATRANS restent « statut à confirmer » ; ONEJEYSIRTECH est décrit comme un projet/concept avec fonctionnalités envisagées.

## Contrôles et build

```bash
pnpm typecheck
pnpm build
pnpm start
```

La compilation produit `dist/` pour le frontend et `dist-server/` pour le serveur. Vérifier `/api/health`, le manifeste `/manus-routes.json`, les documents SEO et l’envoi effectif du formulaire après configuration.

## Déploiement

Le `Dockerfile` construit le client puis exécute Express sur `PORT` (3000 par défaut). L’environnement de déploiement doit fournir les secrets SMTP et `PUBLIC_SITE_URL` avec le domaine canonique réel (par exemple `https://portfolio.example`, sans slash final). Ne pas utiliser le domaine Preview comme domaine de production. Avec `PUBLIC_SITE_URL`, le serveur génère un sitemap XML cohérent et ajoute l’URL du sitemap à `robots.txt`; le canonical et les URL de partage absolues sont alors ajoutés par le client. Sans cette valeur, les adresses absolues ne sont pas inventées. Tester l’URL de santé et l’email après déploiement avant d’annoncer ces fonctions comme opérationnelles.
