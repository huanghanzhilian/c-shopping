# 加载基础镜像
FROM node:18-alpine

# 创建工作目录
#RUN rm -rf /app
RUN mkdir /app
WORKDIR /app

# 设置环境变量
ENV MONGODB_URL "mongodb://db:27017/choiceshop"

# wait 工具
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

# 安装项目依赖
COPY package.json /app
RUN npm install --registry https://registry.npm.taobao.org
COPY . /app

# 监听数据是否启动
# ENTRYPOINT ["/wait"]

# 构建
# RUN npm run build

# 对外暴露端口
EXPOSE 3000

# 启动 Image 时执行命令
CMD /wait && npm run build && npm run start
# CMD npm run dev