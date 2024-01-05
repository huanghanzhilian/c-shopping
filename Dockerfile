# 加载基础镜像
FROM node:18-alpine

# 创建工作目录
#RUN rm -rf /app
RUN mkdir /app
WORKDIR /app

# 设置环境变量
ENV MONGODB_URL "mongodb://db:27017/choiceshop"

# 安装项目依赖
COPY package.json /app
RUN npm install -g next --registry https://registry.npm.taobao.org
RUN npm install --registry https://registry.npm.taobao.org
COPY . /app

# 对外暴露端口
EXPOSE 3000

# 启动 Image 时执行命令
# CMD npm run start