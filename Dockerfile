# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.10.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Next.js/Prisma"

# Next.js/Prisma app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ARG PNPM_VERSION=8.0.0
RUN npm install -g pnpm@${PNPM_VERSION} --force

# Throw-away build stage to reduce size of final image
FROM base as build

ARG NEXT_PUBLIC_EXAMPLE="value"
ARG NEXT_PUBLIC_OTHER="Other value"

# Install packages needed to build node modules
RUN apt-get update && \
    apt-get install -y build-essential node-gyp openssl pkg-config python-is-python3 ca-certificates fuse3 sqlite3

# Install node modules
COPY --link package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
COPY --link prisma .
RUN npx prisma generate

# Copy application code
COPY --link . .

# Build application
RUN pnpm run build

# Remove development dependencies
RUN pnpm install --prod

# Final stage for app image
FROM base

ENV FLY="true"
ENV LITEFS_DIR="/litefs/data"
ENV DATABASE_FILENAME="sqlite.db"
ENV DATABASE_PATH="$LITEFS_DIR/$DATABASE_FILENAME"
ENV DATABASE_URL="file:$DATABASE_PATH"
ENV CACHE_DATABASE_FILENAME="cache.db"
ENV CACHE_DATABASE_PATH="$LITEFS_DIR/$CACHE_DATABASE_FILENAME"
ENV INTERNAL_PORT="8080"
ENV PORT="8081"
# HOSTNAME=
ENV NODE_ENV="production"
# For WAL support: https://github.com/prisma/prisma-engines/issues/4675#issuecomment-1914383246
ENV PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK="1"

# add shortcut for connecting to database CLI
RUN echo "#!/bin/sh\nset -x\nsqlite3 \$DATABASE_URL" > /usr/local/bin/database-cli && chmod +x /usr/local/bin/database-cli

# Install packages needed for deployment
RUN apt-get update && \
    apt-get install -y openssl ca-certificates fuse3 sqlite3 && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Generate random value and save it to .env file which will be loaded by dotenv
RUN INTERNAL_COMMAND_TOKEN=$(openssl rand -hex 32) && \
    echo "INTERNAL_COMMAND_TOKEN=$INTERNAL_COMMAND_TOKEN" > .env.local

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma

COPY --from=build /app /app
# COPY --from=build /app/.next/standalone /app
# COPY --from=build /app/.next/static /app/.next/static
# COPY --from=build /app/public /app/public
COPY --from=build /app/prisma ./prisma

# COPY docker-entrypoint.js /app/docker-entrypoint.js

# litefs
# COPY --from=flyio/litefs:0.5 /usr/local/bin/litefs /usr/local/bin/litefs
COPY --from=flyio/litefs:0.5.11 /usr/local/bin/litefs /usr/local/bin/litefs
ADD other/litefs.yml /etc/litefs.yml
RUN mkdir -p /data ${LITEFS_DIR}

# EXPOSE 8081

ADD . .
CMD ["litefs", "mount"]
