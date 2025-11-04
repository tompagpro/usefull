FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : serveur statique (nginx)
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copie une config nginx custom si besoin
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
