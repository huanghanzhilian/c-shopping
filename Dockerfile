# 加载基础镜像
FROM node:18-alpine

# 创建工作目录
#RUN rm -rf /app
RUN mkdir /app
WORKDIR /app

# 设置环境变量
ENV MONGODB_URL "mongodb://172.28.0.1:27017/choiceshop"

# 安装项目依赖
COPY package.json /app
RUN npm install --registry https://registry.npm.taobao.org
COPY . /app
RUN npm run build

# 对外暴露端口
EXPOSE 3000

# 启动 Image 时执行命令
CMD npm run start
# CMD npm run dev