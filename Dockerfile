FROM node:18-alpine as dependencies
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --registry https://registry.npm.taobao.org

FROM node:18-alpine as builder
WORKDIR /app
COPY ./ ./
COPY ./.env ./
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
ENV MONGODB_URL "mongodb://db:27017/choiceshop"
EXPOSE 3000
# CMD echo 'Waiting for db service start...' && while ! nc -z db 27017; do sleep 1; done; echo 'Connected!' && npm run build && npm run start
CMD npm run start
