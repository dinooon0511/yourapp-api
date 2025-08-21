# backend Dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@9.7.0 --activate || true

FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci || npm i
RUN npx prisma generate && npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma
CMD ["node", "dist/index.js"]
