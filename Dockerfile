# Install dependencies only when needed
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh


# Rebuild the source code only when needed
FROM node:16-alpine AS builder
ENV NODE_OPTIONS="--max-old-space-size=8000"
WORKDIR /app
COPY . .
RUN yarn install

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production


COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["yarn", "start"]