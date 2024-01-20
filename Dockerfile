FROM node:18-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json /app

RUN npm install -g next --registry https://registry.npm.taobao.org
RUN npm install --registry https://registry.npm.taobao.org

COPY . /app

RUN npm run build

ENV MONGODB_URL "mongodb://db:27017/choiceshop"

EXPOSE 3000

# 启动 Image 时执行命令
# CMD echo 'Waiting for db service start...' && while ! nc -z db 27017; do sleep 1; done; echo 'Connected!' && npm run build && npm run start
CMD npm run start
