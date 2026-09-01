# Documentation Complète - Système d'Inscription Square630/Association Andyvie

## Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Architecture Technique](#architecture-technique)
3. [Installation et Configuration](#installation-et-configuration)
4. [Base de données](#base-de-données)
5. [Authentification et Sécurité](#authentification-et-sécurité)
6. [Fonctionnalités](#fonctionnalités)
7. [API Endpoints](#api-endpoints)
8. [Interface Utilisateur](#interface-utilisateur)
9. [Restrictions et Règles Métier](#restrictions-et-règles-métier)
10. [Maintenance et Support](#maintenance-et-support)

---

## Vue d'ensemble

Le système d'inscription Square630/Association Andyvie est une application web moderne permettant aux danseurs de s'inscrire aux cours de hip-hop de l'association. Le système utilise une interface conversationnelle innovante avec un assistant virtuel nommé "Kali" qui guide les utilisateurs tout au long du processus d'inscription.

### Caractéristiques principales
- **Interface conversationnelle** : Assistant IA "Kali" pour une expérience utilisateur engageante
- **Inscription multi-étapes** : Process divisé en 4 étapes claires et progressives
- **Gestion intelligente** : Détection automatique de l'âge et adaptation du parcours
- **Restriction unique** : Un seul dossier d'inscription par utilisateur
- **Design moderne** : Interface blue-themed avec animations et effets visuels

---

## Architecture Technique

### Stack Technologique
- **Frontend** : Nuxt.js 4 (Vue 3)
- **Backend** : Nitro Server (Nuxt Server)
- **Base de données** : MySQL
- **ORM** : Prisma
- **Authentification** : JWT (JSON Web Tokens)
- **Styling** : Tailwind CSS v4
- **Langage** : TypeScript

### Structure du projet
```
newandyvienuxt.fr/
├── app/
│   ├── pages/
│   │   ├── login.vue                 # Page de connexion
│   │   ├── register.vue              # Page d'inscription compte
│   │   ├── dashboard.vue             # Tableau de bord utilisateur
│   │   └── inscription/
│   │       ├── step-1.vue            # Étape 1 - Informations personnelles
│   │       ├── step-2.vue            # Étape 2 - Responsable légal
│   │       ├── step-3.vue            # Étape 3 - Contacts d'urgence
│   │       ├── step-4.vue            # Étape 4 - Choix des groupes
│   │       └── success.vue           # Page de confirmation
│   └── components/
│       └── ProgressBar.vue           # Barre de progression
├── server/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.post.ts         # API connexion
│   │   │   ├── register.post.ts      # API création compte
│   │   │   └── me.get.ts             # API info utilisateur
│   │   └── inscriptions/
│   │       ├── complete.post.ts      # API sauvegarde inscription
│   │       ├── check-existing.get.ts # API vérification inscription existante
│   │       └── test.post.ts          # API de test
│   └── middleware/
│       └── auth.ts                   # Middleware d'authentification
├── prisma/
│   └── schema.prisma                 # Schéma de base de données
└── composables/
    └── useAuth.ts                    # Composable d'authentification
```

---

## Installation et Configuration

### Prérequis
- Node.js 18+
- MySQL 8.0+
- npm ou yarn

### Installation

1. **Cloner le repository**
```bash
git clone [repository-url]
cd newandyvienuxt.fr
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
Créer un fichier `.env` à la racine :
```env
DATABASE_URL="mysql://user:password@localhost:3306/square630_db"
JWT_SECRET="votre-secret-jwt-securise"
```

4. **Initialiser la base de données**
```bash
# Synchroniser le schéma avec la BDD existante
npx prisma db pull

# Générer le client Prisma
npx prisma generate
```

5. **Lancer l'application**
```bash
# Mode développement
npm run dev

# Build production
npm run build
npm run preview
```

---

## Base de données

### Schéma des tables principales

#### Table `users`
- `id` : INT (PK, auto-increment)
- `email` : VARCHAR(255) UNIQUE
- `password` : VARCHAR(255) (hashé avec bcrypt)
- `role` : VARCHAR(50) DEFAULT 'user'
- `createdAt` : DATETIME
- `updatedAt` : DATETIME

#### Table `dancers`
- `id` : INT (PK, auto-increment)
- `userId` : INT (FK vers users.id) - **UNIQUE pour restriction une inscription**
- `email` : VARCHAR(255)
- `firstName` : VARCHAR(100)
- `lastName` : VARCHAR(100)
- `birthDate` : DATE
- `address` : VARCHAR(255)
- `postalCode` : VARCHAR(10)
- `city` : VARCHAR(100)
- `phone` : VARCHAR(20)
- `schoolLevel` : ENUM (CP, CE1, CE2, ..., ADULTE)
- `tShirtSize` : ENUM (XS, S, M, L, XL, XXL)
- `otherInfo` : TEXT NULL
- `createdAt` : DATETIME
- `updatedAt` : DATETIME

#### Table `guardians`
- `id` : INT (PK, auto-increment)
- `dancerId` : INT (FK vers dancers.id) UNIQUE
- `email` : VARCHAR(255)
- `firstName` : VARCHAR(100)
- `lastName` : VARCHAR(100)
- `address` : VARCHAR(255)
- `postalCode` : VARCHAR(10)
- `city` : VARCHAR(100)
- `phone` : VARCHAR(20)
- `authorized` : BOOLEAN DEFAULT false
- `createdAt` : DATETIME
- `updatedAt` : DATETIME

#### Table `emergency_contacts`
- `id` : INT (PK, auto-increment)
- `dancerId` : INT (FK vers dancers.id)
- `type` : ENUM (EMERGENCY_AND_PICKUP, EMERGENCY_ONLY, PICKUP_ONLY)
- `firstName` : VARCHAR(100)
- `lastName` : VARCHAR(100)
- `phone` : VARCHAR(20)
- `createdAt` : DATETIME
- `updatedAt` : DATETIME

#### Table `dance_groups`
- `id` : INT (PK, auto-increment)
- `name` : VARCHAR(100) UNIQUE
- `description` : TEXT
- `schedule` : VARCHAR(100)
- `ageGroup` : VARCHAR(50)
- `isActive` : BOOLEAN DEFAULT true
- `createdAt` : DATETIME
- `updatedAt` : DATETIME

#### Table `registrations`
- `id` : INT (PK, auto-increment)
- `dancerId` : INT (FK vers dancers.id)
- `danceGroupId` : INT (FK vers dance_groups.id)
- `sportCode` : VARCHAR(50) NULL
- `status` : ENUM (DRAFT, SUBMITTED, APPROVED, REJECTED)
- `submittedAt` : DATETIME NULL
- `reviewedAt` : DATETIME NULL
- `reviewedBy` : INT NULL (FK vers users.id)
- `notes` : TEXT NULL
- `createdAt` : DATETIME
- `updatedAt` : DATETIME
- **UNIQUE KEY** : (dancerId, danceGroupId)

---

## Authentification et Sécurité

### Système d'authentification
- **JWT** : Tokens sécurisés avec expiration
- **Bcrypt** : Hash des mots de passe (salt rounds: 10)
- **Cookies HTTPOnly** : Stockage sécurisé des tokens
- **Middleware** : Protection des routes privées

### Flux d'authentification
1. L'utilisateur se connecte avec email/mot de passe
2. Le serveur vérifie les credentials
3. Un JWT est généré et stocké dans un cookie HTTPOnly
4. Le token est vérifié à chaque requête API protégée
5. Le token expire après 7 jours

### Sécurité
- **Validation des entrées** : Toutes les données sont validées côté serveur
- **Protection CSRF** : Via tokens dans les cookies
- **Rate limiting** : À implémenter pour éviter le brute force
- **HTTPS** : Obligatoire en production

---

## Fonctionnalités

### 1. Création de compte
- Inscription avec email et mot de passe
- Validation de l'unicité de l'email
- Hash sécurisé du mot de passe

### 2. Connexion
- Authentification par email/mot de passe
- Génération de token JWT
- Redirection vers le dashboard

### 3. Process d'inscription (4 étapes)

#### Étape 1 : Informations personnelles
- **Champs** : Prénom, Nom, Date de naissance, Adresse, Téléphone
- **Intelligence** : Calcul automatique de l'âge
- **Interface** : Conversation avec Kali
- **Validation** : Vérification de l'inscription unique

#### Étape 2 : Responsable légal
- **Condition** : Uniquement pour les mineurs
- **Champs** : Email du responsable
- **Intelligence** : Skip automatique pour les majeurs

#### Étape 3 : Contacts d'urgence
- **Fonctionnalité** : Ajout multiple de contacts
- **Champs** : Nom et téléphone
- **Flexibilité** : Possibilité d'ajouter plusieurs contacts

#### Étape 4 : Choix des groupes de danse
- **Sélection** : Multiple (checkboxes)
- **Groupes disponibles** :
  - Les Kids (CP/CE1) - Samedi 12h-13h
  - La Relève (CE2/CM1/CM2) - Samedi 13h-14h
  - Les Espoirs (6e/5e) - Samedi 14h-15h
  - Les Confirmés (4e/3e) - Samedi 15h-16h
  - Hiphop Battle (Lycée) - Samedi 16h-17h30
  - Hiphop Advanced (Adulte) - Samedi 17h30-19h

### 4. Restriction d'inscription unique
- **Règle** : Un utilisateur ne peut avoir qu'une seule demande d'inscription
- **Vérification** : Au début du process et avant la sauvegarde
- **Message** : Information claire si inscription existante
- **Contact** : Lien pour contacter l'administration

---

## API Endpoints

### Authentification

#### POST `/api/auth/register`
Création d'un nouveau compte utilisateur
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/login`
Connexion utilisateur
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Récupération des informations de l'utilisateur connecté
- Headers : `Authorization: Bearer [token]` ou Cookie `auth-token`

### Inscriptions

#### GET `/api/inscriptions/check-existing`
Vérifie si l'utilisateur a déjà une inscription
- Headers : `Authorization: Bearer [token]`
- Response :
```json
{
  "hasExistingRegistration": true,
  "dancer": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "registrations": [...]
  }
}
```

#### POST `/api/inscriptions/complete`
Sauvegarde complète de l'inscription
- Headers : `Authorization: Bearer [token]`
- Body :
```json
{
  "step1": {
    "firstName": "John",
    "lastName": "Doe",
    "birthDate": "2010-01-01",
    "address": "123 rue de la Danse",
    "city": "Paris",
    "postalCode": "75001",
    "phone": "0612345678"
  },
  "step2": {
    "guardianEmail": "parent@example.com"
  },
  "step3": {
    "emergencyContacts": [
      {
        "name": "Marie Dupont",
        "phone": "0687654321"
      }
    ]
  },
  "step4": {
    "selectedDanceGroups": [
      {
        "name": "Les Kids",
        "ageRange": "CP / CE1",
        "schedule": "Samedi 12h-13h",
        "description": "..."
      }
    ]
  }
}
```

---

## Interface Utilisateur

### Design System

#### Couleurs principales
- **Primaire** : Dégradé slate-blue-indigo
- **Backgrounds** : 
  - `from-slate-900 via-blue-900 to-indigo-900`
- **Accents** :
  - Succès : Green (green-400 to green-500)
  - Erreur : Red (red-50, red-200, red-700)
  - Warning : Orange (orange-50, orange-200, orange-700)

#### Composants UI

##### Assistant Kali
- Avatar animé avec effet de pulsation
- Bulles de conversation avec typewriter effect
- Vitesse de frappe : 20ms par caractère
- Délai entre les étapes : 800ms

##### Boutons
```css
.btn-primary {
  background: gradient slate-blue-indigo
  hover: transform -translate-y-1
  transition: all 300ms
}

.btn-secondary {
  background: white/10
  backdrop-filter: blur-xl
  border: 1px white/20
}
```

##### Animations
- Particules flottantes en arrière-plan
- Effets de blur et de gradient animés
- Transitions fluides entre les étapes
- Loading spinners personnalisés

### Responsive Design
- Mobile-first approach
- Breakpoints : sm (640px), md (768px), lg (1024px), xl (1280px)
- Adaptation des tailles de texte et espacements

---

## Restrictions et Règles Métier

### Règles d'inscription
1. **Unicité** : Un utilisateur = Une inscription maximum
2. **Âge** : 
   - Mineurs (< 18 ans) : Responsable légal obligatoire
   - Majeurs (>= 18 ans) : Skip étape responsable légal
3. **Contacts d'urgence** : Au moins un contact recommandé
4. **Groupes** : Sélection multiple autorisée

### Validation des données
- **Email** : Format valide et unicité
- **Téléphone** : Format français (10 chiffres)
- **Code postal** : 5 chiffres
- **Date de naissance** : Format valide et cohérent

### États d'inscription
- `DRAFT` : Inscription en cours de création
- `SUBMITTED` : Inscription soumise
- `APPROVED` : Inscription approuvée par l'admin
- `REJECTED` : Inscription refusée

---

## Maintenance et Support

### Logs et Monitoring
- Logs serveur dans la console Nitro
- Erreurs Prisma loggées avec détails
- Console.log pour debug en développement

### Base de données
```bash
# Vérifier l'état de la BDD
npx prisma db pull

# Mettre à jour le schéma
npx prisma db push

# Ouvrir Prisma Studio
npx prisma studio
```

### Commandes utiles
```bash
# Développement
npm run dev

# Build production
npm run build

# Linting
npm run lint

# Type checking
npm run typecheck

# Tests (à implémenter)
npm run test
```

### Problèmes fréquents

#### Erreur 404 sur les API
- Vérifier que les fichiers sont dans `server/api/` et non `app/server/api/`

#### Erreurs TypeScript avec Prisma
- Relancer `npx prisma generate`
- Utiliser `@ts-ignore` si nécessaire pour les modèles générés

#### Problèmes de style Tailwind v4
- Éviter `@apply` directives
- Utiliser les classes directement dans le template

### Contact Support
- Email : contact@square630.fr
- Documentation : Ce fichier
- Issues : GitHub repository

---

## Évolutions futures

### Court terme
- [ ] Back-office administrateur
- [ ] Fonctionnalité "Mot de passe oublié"
- [ ] Export des inscriptions (CSV/PDF)
- [ ] Notifications email

### Moyen terme
- [ ] Paiement en ligne
- [ ] Gestion des présences
- [ ] Espace membre complet
- [ ] Application mobile

### Long terme
- [ ] Système de réservation de cours
- [ ] Gestion des événements
- [ ] Forum communautaire
- [ ] Streaming des cours

---

## Licence et Crédits

Développé pour Square630/Association Andyvie
© 2025 - Tous droits réservés

---

*Documentation générée le 01/09/2025*
*Version : 1.0.0*