FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm install pg

FROM base AS development
ENV NODE_ENV=development
RUN npm ci --only=dev
RUN npm install pg
COPY . .
CMD ["npm", "run", "dev"]

FROM base AS production
ENV NODE_ENV=production
RUN npm ci --production
RUN npm install pg
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
