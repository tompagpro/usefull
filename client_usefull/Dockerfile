# --- ÉTAPE 1: Build (Installation et Création du build statique) ---
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Lance la commande de construction (souvent 'npm run build')
# Le résultat est généralement dans le dossier 'build' ou 'dist'
RUN npm run build


# --- ÉTAPE 2: Production (Image Nginx pour servir les fichiers statiques) ---
# Utilisation de Nginx, un serveur web très performant et léger
FROM nginx:alpine

# Copier les fichiers statiques du build React (ici le dossier 'dist' de Vite)
COPY --from=builder /app/dist /usr/share/nginx/html

# Optionnel: Copier une configuration Nginx personnalisée si nécessaire (pour le routage par exemple)
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port par défaut de Nginx
EXPOSE 80

# La commande par défaut de Nginx est de démarrer le serveur, pas besoin de CMD ici
