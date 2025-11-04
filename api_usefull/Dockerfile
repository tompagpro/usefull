FROM node:18-alpine

# Crée un dossier de travail
WORKDIR /app

# Copie les fichiers
COPY package*.json ./
RUN npm install

COPY . .

# Build le projet
RUN npm run build

# Expose le port (à adapter)
EXPOSE 3000

# Lancer l'app Nest
CMD ["npm", "run", "start:prod"]


# # BUILD

# FROM node:18-alpine AS build

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# # PRODUCTION

# FROM node:18-alpine

# WORKDIR /usr/src/app

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}}

# COPY --from=build /usr/src/app/dist ./dist

# COPY package*.json ./

# RUN npm install --only=production

# EXPOSE 3000

# CMD [ "node", "dist/main.js" ]
