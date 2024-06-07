FROM node:18-alpine as dependencies
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

FROM node:18-alpine as builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY ./ ./
COPY ./.env ./

RUN npm run build

FROM node:18-alpine as runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --chown=nextjs:nodejs --from=builder /app/.next ./.next
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

ENV MONGODB_URL "mongodb://db:27017/choiceshop"
EXPOSE 3000

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# RUN mkdir -p .next/cache/fetch-cache
# RUN chown -R nextjs:nodejs .next
# USER nextjs
# CMD echo 'Waiting for db service start...' && while ! nc -z db 27017; do sleep 1; done; echo 'Connected!' && npm run build && npm run start
# CMD npm run start
CMD ["node_modules/.bin/next", "start"]
