# Template: Node.js dockerfile
# Description: Include this file in the root of application to build a docker

# Select the official image based on Node.js 20.5
FROM node:20.5-alpine AS base
RUN echo 'Docker From `node:20.5`'

# 1. Install Dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manage
COPY ./app/package.json ./app/yarn.lock* ./app/package-lock.json* ./app/pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi


# 2. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app
COPY ./app .

# Build Source Code
RUN npm install typescript -g
RUN tsc -p tsconfig.json

# Build Swagger
RUN npm install swagger-cli -g
RUN swagger-cli bundle ./docs/swagger.yaml --outfile ./dist/swagger.yaml --type yaml

# 3. Production image, copy all the files and run Express with pm2 runtime process manager
FROM base AS runner
WORKDIR /app

ARG NODE_MODE
ENV NODE_MODE ${NODE_MODE}

RUN addgroup -g 1001 -S nodejs
RUN adduser -S express -u 1001

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder --chown=express:nodejs /app/dist ./dist
COPY --from=builder --chown=express:nodejs /app/env ./env
COPY --from=builder --chown=express:nodejs /app/ecosystem.config.js ./

# Install pm2
RUN npm install pm2 -g

# Install pm2-logrotate
RUN pm2 install pm2-logrotate

# Start Node Server - Redis Reverse Proxy Server
# When starting the container with pm2, it initializes but then automatically shuts down. 
# Therefore, it is essential to use pm2-runtime to keep the container running.
CMD pm2-runtime start ecosystem.config.js --env ${NODE_MODE}