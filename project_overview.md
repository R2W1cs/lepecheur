# Projet : Restaurant Le Pêcheur - Site Web Premium

Ce document explique en détail l'architecture, les fonctionnalités et les technologies utilisées pour construire le site web de "Restaurant Le Pêcheur".

## 1. Vue d'ensemble (Overview)

Le projet est un site web moderne, performant et élégant conçu pour un restaurant de fruits de mer haut de gamme. L'objectif principal est d'offrir une expérience utilisateur immersive (design "Coastal Premium") tout en fournissant des outils pratiques comme un système de réservation fiable et un tableau de bord pour le personnel.

## 2. Stack Technologique

Le site est construit avec les technologies web les plus modernes :

*   **Framework Principal : Next.js 14 (App Router)**
    *   C'est le moteur du site. Il permet de créer des pages côté serveur (pour un meilleur SEO et une plus grande rapidité) et côté client.
*   **Langage : TypeScript**
    *   Assure que le code est robuste et sans erreurs de type avant même l'exécution.
*   **Stylisation : Tailwind CSS**
    *   Utilisé pour le design de A à Z. Il permet de créer des styles sur mesure très rapidement grâce à des classes utilitaires (ex: `bg-primary-dark`, `text-accent-gold`).
*   **Animations : Framer Motion**
    *   Responsable de la fluidité du site, notamment l'effet "parallaxe" du poisson sur la page d'accueil (qui bouge selon la vitesse de défilement).
*   **Base de Données (Cache/Temps Réel) : Redis (via ioredis)**
    *   Utilisé pour stocker les réservations de manière instantanée, permettant au tableau de bord du personnel d'être mis à jour en temps réel.
*   **Mails : Resend**
    *   L'API moderne utilisée pour envoyer des notifications par e-mail lors d'une nouvelle réservation.

## 3. Architecture des Dossiers

Voici à quoi sert chaque dossier principal du projet :

*   `/app` : Le cœur de Next.js. Chaque sous-dossier correspond à une page (URL) du site.
    *   `/app/page.tsx` : La page d'accueil (Accueil).
    *   `/app/reservation/page.tsx` : La page avec le formulaire de réservation pour les clients.
    *   `/app/staff/page.tsx` : Le tableau de bord privé pour les employés.
    *   `/app/api/reserve/route.ts` : Le "Backend" (le cerveau) qui traite les réservations, les enregistre dans Redis, et envoie le mail.
*   `/components` : Les morceaux d'interface réutilisables.
    *   `/components/ui/Navbar.tsx` : La barre de navigation adaptative (change de couleur selon la page).
    *   `/components/home/Hero.tsx` : La section d'accueil avec le poisson animé.
*   `/lib` : Les utilitaires système.
    *   `/lib/redis.ts` : Le fichier de connexion à la base de données Redis Labs.
*   `/public` : Les éléments statiques (images, polices, logo) qui ne changent pas.
*   `/store` : La gestion d'état local (avec Zustand) pour garder en mémoire certaines interactions de l'utilisateur.

## 4. Fonctionnalités Clés

### A. Design Parallaxe et Adaptatif
*   **Le Poisson (Dorade) :** Sur l'accueil, l'image du poisson réagit à la vitesse de scroll de l'utilisateur (scroll velocity). Plus on descend vite, plus le poisson "nage".
*   **Navbar Intelligente :** Elle détecte automatiquement sur quelle page on se trouve. Sur une page sombre (comme l'accueil), elle est transparente avec du texte clair. Sur une page blanche, elle s'adapte pour rester visible.

### B. Le Système de Réservation (Double Sécurité)
C'est la fonctionnalité la plus complexe :
1.  **Formulaire Client :** Le client remplit ses infos (nom, date, heure, téléphone).
2.  **Traitement Backend (`/api/reserve`) :** Quand le client clique sur "Réserver", les données vont au serveur.
3.  **Sauvegarde (Redis) :** Le serveur enregistre d'abord la réservation dans la base de données distante Redis Labs. C'est instantané.
4.  **Notification (Resend) :** Ensuite, le serveur tente d'envoyer un bel e-mail HTMl au propriétaire du restaurant.
5.  **Option "Fail-Safe" (WhatsApp) :** Si l'utilisateur préfère, ou s'il y a le moindre souci, un bouton WhatsApp pré-rempli permet d'envoyer la réservation directement sur l'application mobile.

### C. Le Tableau de Bord du Personnel (`/staff`)
*   C'est une page cachée (`/staff?key=lepecheur2024`).
*   Elle se connecte directement à la base de données Redis.
*   Elle affiche la liste de TOUTES les réservations de manière propre et lisible, avec un indicateur 'vert' confirmant que la base de données est bien "En ligne". Cela permet à l'équipe de voir les arrivées prévues même s'ils ne lisent pas leurs emails.

## 5. Le Workflow de Déploiement

*   **GitHub :** Tout le code est hébergé la-bas. C'est l'historique du projet.
*   **Vercel :** Vercel "écoute" GitHub. Chaque fois qu'on pousse (`git push`) de nouveaux changements sur GitHub, Vercel télécharge le code, le compile, et met à jour le site en ligne (`lepecheur.vercel.app`) en moins d'une minute, automatiquement.

En bref, c'est un projet de niveau professionnel qui combine un design visuellement impressionnant ("Front-end") avec un système de gestion des données très solide ("Back-end").
