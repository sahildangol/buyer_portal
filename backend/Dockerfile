FROM node:20-alpine AS base

WORKDIR /app
RUN corepack enable

FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS build

COPY tsconfig.json prisma.config.ts ./
COPY prisma ./prisma
COPY src ./src

RUN pnpm prisma generate
RUN pnpm build

FROM base AS runtime

ENV NODE_ENV=production

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts --shamefully-hoist

COPY prisma.config.ts ./prisma.config.ts
COPY docker-entrypoint.sh ./docker-entrypoint.sh
COPY --from=build --chown=appuser:appgroup /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build --chown=appuser:appgroup /app/dist ./dist
COPY --from=build --chown=appuser:appgroup /app/prisma ./prisma
COPY --from=build --chown=appuser:appgroup /app/package.json ./package.json

RUN chmod +x ./docker-entrypoint.sh && chown appuser:appgroup ./docker-entrypoint.sh
RUN chown -R appuser:appgroup /app

EXPOSE 5000
USER appuser

CMD ["./docker-entrypoint.sh"]
