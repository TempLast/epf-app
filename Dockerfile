# Étape 1 : installation des dépendances de production uniquement
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Étape 2 : image finale, la plus petite possible
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000

ARG APP_VERSION=dev
ENV APP_VERSION=$APP_VERSION

COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src

# Ne jamais tourner en root dans un conteneur
USER node

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "src/server.js"]
