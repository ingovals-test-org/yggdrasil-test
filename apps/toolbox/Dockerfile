FROM node:22-alpine
WORKDIR /app

ARG APP_VERSION=unknown
ENV APP_VERSION=${APP_VERSION}

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy standalone output (includes server.js and minimal node_modules)
COPY .next/standalone ./
# Copy static assets — standalone does not include these.
# Path mirrors the monorepo structure preserved by pnpm workspace standalone output.
COPY .next/static ./apps/toolbox/.next/static

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/toolbox/server.js"]
