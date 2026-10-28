# --- ÉTAPE 1: Build (Installation et Compilation) ---
FROM node:18-alpine AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
# Cela permet à Docker de mettre en cache cette étape si les fichiers ne changent pas
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste du code source
COPY . .

# Compiler l'application NestJS (le résultat est dans le dossier 'dist')
RUN npm run build


# --- ÉTAPE 2: Production (Image finale légère) ---
FROM node:20-slim AS production

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier uniquement les dépendances de production depuis l'étape précédente
COPY package*.json ./
RUN npm install --only=production

# Copier le code compilé depuis l'étape 'builder'
# Seul le contenu du dossier 'dist' et node_modules de production est copié
COPY --from=builder /app/dist ./dist

# Exposer le port par défaut de NestJS (souvent 3000)
EXPOSE 3000

# Commande à exécuter lorsque le conteneur démarre
# Lance l'application compilée
CMD ["node", "dist/main"]
