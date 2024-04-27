# Étape 1 : Construire l'image de l'application Next.js
FROM node:14 AS build

# Créer le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Exécuter l'application Next.js
FROM node:14

# Créer le répertoire de travail
WORKDIR /app

# Copier les fichiers construits de l'étape précédente
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

# Installer seulement les dépendances de production
RUN npm install --only=production

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
