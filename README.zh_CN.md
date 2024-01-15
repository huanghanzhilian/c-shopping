<p align="center">
	<img alt="logo" src="https://www.cheerspublishing.com/uploads/article/3ce26e55-1e14-4e51-aec1-1c18533f953c.png" width="300">
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">C-Shopping v1.0.0</h1>
<h4 align="center">基于Nextjs开发同时适配Desktop、Tablet、Phone多种设备的精美购物平台</h4>

## README.md
- en [English](README.md)
- zh_CN [简体中文](README.zh_CN.md)

## 前言

`c-shopping`是一个精美的web电商系统，支持响应式交互，界面优雅，功能丰富，小巧迅速，包含一个电商平台MVP完整功能，具备良好的审美风格与编码设计。

希望来的人，有所收获。故事不结束，青春不散场。

## 项目介绍

**背景：**
- 一直以来前端UI框架被固定形式占据（受限于传统的UI框架），导致视觉疲劳，在开发一些高度自定义的项目时，往往力不从心；
- 多设备适配的web优秀项目很少，学习和维护成本较高；
- 当项目复杂后，在组件需要调用多个 api 时会变得复杂起来，比如需要管理多个 loading 和 error 状态，这会导致产生非常多的 state 声明，还有请求取消、请求竞态等可能存在的问题也容易被忽略；
- 随着项目复杂，样式的开发与维护变得庞大且臃肿；

**意图：**

改进背景中提到的问题。

**目的：**

打造一个完整的，适合web端的良好生态。

### 项目在线演示

项目在线演示地址：[http://shop.huanghanlian.com/](http://shop.huanghanlian.com/)

### 使用技术

- NextJs
- TailwindCss
- Headless UI
- MongoDB
- Redux - Toolkit - RTK Query
- JWT
- Docker


### 项目结构

```
├── Dockerfile
├── README.md
├── app
│   ├── (main)
│   │   ├── (client-layout)
│   │   ├── (empty-layout)
│   │   ├── admin
│   │   ├── layout.js
│   │   └── profile
│   ├── StoreProvider.js
│   ├── api
│   │   ├── auth
│   │   ├── banner
│   │   ├── category
│   │   ├── details
│   │   ├── order
│   │   ├── products
│   │   ├── reviews
│   │   ├── slider
│   │   ├── upload
│   │   └── user
│   ├── layout.js
│   └── not-found.js
├── commitlint.config.js
├── components
├── docker-compose.yml
├── helpers
│   ├── api
│   ├── auth.js
│   ├── db-repo
│   ├── db.js
│   ├── getQuery.js
│   └── index.js
├── hooks
├── jsconfig.json
├── models
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
├── store
├── styles
├── tailwind.config.js
└── utils
```

### 功能

用户端：
- 登录 JWT认证
- 注册
- 首页（分类navBar、banner、slider、特价板块、hot板块、畅销板块）
- 搜索
- 二级分类页（分类navBar、banner、slider、特价板块、hot板块、畅销板块）
- 三级分类页（排序、筛选）
- 商品详情（购物车）
- 购物车页
- 支付页
- 个人中心
- 我的订单
- 我的评论
- 地址管理
- 近期访问

管理端：
- 登录 JWT认证
- 注册
- 用户管理
- 分类管理
- 规格管理
- 商品管理
- 订单管理
- 评论管理
- 滑块管理
- banner管理

### 演示图

#### 用户端

|模块|Desktop devices|Mobile devices|
|--|------------|--|
|首页|<img src="https://www.cheerspublishing.com/uploads/article/901edcbd-b143-4f33-9d35-74fda6dbcb0d.gif" />|<img src="https://www.cheerspublishing.com/uploads/article/cb1e4f8f-aab4-4b83-8cf5-13558bb8f6dc.gif" />|
|二级分类|<img src="https://www.cheerspublishing.com/uploads/article/6b53db16-d55b-4c7b-8088-fb637aad3921.png" />|<img src="https://www.cheerspublishing.com/uploads/article/542c8bf9-344a-4c19-a9e3-27bc0ec92bd5.png" />|
|三级分类|<img src="https://www.cheerspublishing.com/uploads/article/94ca43fa-3381-45a5-a5bf-80499533f3d5.png" />|<img src="https://www.cheerspublishing.com/uploads/article/f90b95ba-4b43-48fa-bf70-7736fcc7f9c5.png" />|
|商品详情|<img src="https://www.cheerspublishing.com/uploads/article/183dd238-2f33-48b3-85f6-d917bf78ba01.png" />|<img src="https://www.cheerspublishing.com/uploads/article/eb4ae7db-c490-4af2-a99c-d0b10fd6c01e.png" />|
|登录|<img src="https://www.cheerspublishing.com/uploads/article/e9a0ce6a-f1e9-4b5d-a03e-236338243e48.png" />|<img src="https://www.cheerspublishing.com/uploads/article/3ec1a909-294c-40d5-98dd-8c890cd8eba2.png" />|
|注册|<img src="https://www.cheerspublishing.com/uploads/article/5070ac14-4ae8-4eae-9491-27dc33db693f.png" />|<img src="https://www.cheerspublishing.com/uploads/article/88d32659-0a3d-453c-8f2d-daa8e4ee1b14.png" />|
|搜索|<img src="https://www.cheerspublishing.com/uploads/article/375b23ff-c493-498a-9ca5-e42d1e15e4c9.png" />|<img src="https://www.cheerspublishing.com/uploads/article/52518186-e141-4614-8da8-c38a31c7895b.png" />|
|购物车|<img src="https://www.cheerspublishing.com/uploads/article/233ee4fb-e1ca-4716-ba5f-17224bb252bf.png" />|<img src="https://www.cheerspublishing.com/uploads/article/17578ef8-1af0-4b03-9942-f5f805d9045b.png" />|
|支付页|<img src="https://www.cheerspublishing.com/uploads/article/2cc56a0c-f2b1-4f4c-9bd0-1aea5d4a36a5.png" />|<img src="https://www.cheerspublishing.com/uploads/article/334c73aa-db17-4624-8e0f-c7ea44236974.png" />|
|个人中心|<img src="https://www.cheerspublishing.com/uploads/article/3d1db865-9b6b-4c4d-8803-9b94444def73.png" />|<img src="https://www.cheerspublishing.com/uploads/article/a671fef1-401c-4c3d-9a1d-6cd59ecb9d63.png" />|
|我的订单|<img src="https://www.cheerspublishing.com/uploads/article/aab4ff6f-50ea-48b8-a74b-dbb6fe178810.png" />|<img src="https://www.cheerspublishing.com/uploads/article/8114f995-495c-4044-8b6b-2ef2a746d125.png" />|
|我的评论|<img src="https://www.cheerspublishing.com/uploads/article/dfa14b9e-2c19-4ea1-b4c9-45483bbc52fe.png" />|<img src="https://www.cheerspublishing.com/uploads/article/686c0dd9-d9a0-4ff3-9953-eef499349930.png" />|
|地址管理|<img src="https://www.cheerspublishing.com/uploads/article/1c214382-d281-43b8-87c6-159b9b10e965.png" />|<img src="https://www.cheerspublishing.com/uploads/article/d4448bfc-40b0-4b18-ae47-c3a9f9884918.png" />|
|近期访问|<img src="https://www.cheerspublishing.com/uploads/article/c375fe8d-fb49-45a3-bdfc-8a90de031b25.png" />|<img src="https://www.cheerspublishing.com/uploads/article/73a67a1d-a9ae-4ded-990a-4ef172671d34.png" />|


#### 管理端

|模块|Desktop devices|Mobile devices|
|--|------------|--|
|登录|<img src="https://www.cheerspublishing.com/uploads/article/10fc1ee3-44ec-4380-ba90-6b2d809fb625.png" />|<img src="https://www.cheerspublishing.com/uploads/article/d3995bbe-df4f-490a-b8df-998932840ab6.png" />|
|管理中心|<img src="https://www.cheerspublishing.com/uploads/article/ae09d053-e2df-4176-8470-b063f556069e.png" />|<img src="https://www.cheerspublishing.com/uploads/article/633169d7-a616-40fc-8970-d79748734873.png" />|
|用户管理|<img src="https://www.cheerspublishing.com/uploads/article/250ee952-3757-42db-8828-60d8142edd4a.png" />|<img src="https://www.cheerspublishing.com/uploads/article/ad6fa92c-2bda-4391-9c93-e59fdeff59c3.png" />|
|分类管理|<img src="https://www.cheerspublishing.com/uploads/article/f644d10f-bda4-4309-944c-587dbe3e8931.png" />|<img src="https://www.cheerspublishing.com/uploads/article/458eb6ab-2c88-4654-8262-81dffe0b3c66.png" />|
|分类管理树状|<img src="https://www.cheerspublishing.com/uploads/article/8eef2702-c06b-4996-bd15-229a3ccb6e2d.png" />|<img src="https://www.cheerspublishing.com/uploads/article/27516b00-c0e0-4a12-aedc-a9f64f64db1b.png" />|
|规格管理|<img src="https://www.cheerspublishing.com/uploads/article/50eb69ce-0545-4def-91e2-ceac09b1222d.png" />|<img src="https://www.cheerspublishing.com/uploads/article/b96bc0fe-ad45-4b1c-b4d9-945e675cc7b9.png" />|
|商品管理|<img src="https://www.cheerspublishing.com/uploads/article/893128e7-06e3-47b5-9fb8-8757faf28941.png" />|<img src="https://www.cheerspublishing.com/uploads/article/1d9b03aa-8673-4405-ad2f-2d61e413c114.png" />|
|订单管理|<img src="https://www.cheerspublishing.com/uploads/article/e5473ac2-859c-4774-8879-f31516da956a.png" />|<img src="https://www.cheerspublishing.com/uploads/article/7ac7850b-798c-4954-95ad-3fab562bf418.png" />|
|评论管理|<img src="https://www.cheerspublishing.com/uploads/article/3979c2fc-87ca-4604-8258-5be1e5af97b9.png" />|<img src="https://www.cheerspublishing.com/uploads/article/0df0021a-626f-452c-b4dc-d9b0c927d4e3.png" />|
|滑块管理|<img src="https://www.cheerspublishing.com/uploads/article/6419e018-3322-40f6-b796-105e125d7052.png" />|<img src="https://www.cheerspublishing.com/uploads/article/b695af32-cd0e-4009-a278-adb2a4f22b2f.png" />|
|banner管理|<img src="https://www.cheerspublishing.com/uploads/article/c8fd0a19-f020-41b1-8590-8e88d7d4f659.png" />|<img src="https://www.cheerspublishing.com/uploads/article/7bc682e2-60c2-45f3-80c3-e94ade1223b2.png" />|

## 环境搭建与部署

### 开发环境

1. 通过在终端运行以下命令克隆或下载存储库:

	```
	git clone https://github.com/huanghanzhilian/c-shopping.git
	```
2. 使用npm或yarn安装项目依赖项:

	```
	npm install
	```
	or
	```
	yarn
	```
3. 修改.env的文件，在项目根目录，定义所需的环境变量。这个步骤是重要的（图片上传OSS）:

	```
	NEXT_PUBLIC_ALI_REGION=<your ali endpoint>
	NEXT_PUBLIC_ALI_BUCKET_NAME=<your ali bucket name>
	NEXT_PUBLIC_ALI_ACCESS_KEY=<your ali access key>
	NEXT_PUBLIC_ALI_SECRET_KEY=<your ali secret key>
	NEXT_PUBLIC_ALI_ACS_RAM_NAME=<your ali acs:ram name>
	NEXT_PUBLIC_ALI_FILES_PATH=<your ali files pathname>
	```
4. 在本地机器上安装MongoDB
5. 运行项目
	```
	npm run dev 
	```
6. 注册一个账户
	```
	http://localhost:3000/register
	```
7. 创建帐户后，在数据库中找到您的帐户，并将root字段修改为true。role字段修改为admin，这将授予您访问所有管理仪表板功能的权限
	```
	http://localhost:3000/admin
	```
8. 操作MongoDB，创建根分类
	```
	mongo
	```
	```
	use choiceshop
	```
	```
	db.categories.insert({
		"name" : "精选好物",
		"slug" : "choiceshop",
		"image" : "http://huanghanzhilian-test.oss-cn-beijing.aliyuncs.com/shop/upload/image//icons/zHle_bmdM_dhu2K938MMM.webp",
		"colors" : {
			"start" : "#EF394E",
			"end" : "#EF3F55"
		},
		"level" : 0
	})
	```
### docker 部署

项目根目录已经配置好docker compose，在安装docker环境后，直接运行部署

```
docker compose up -d --build
```

## 公众号

关注公众号获得更多资讯，有任何意见或建议都欢迎提issue，或者到公众号。

![继小鹏公众号](https://www.cheerspublishing.com/uploads/article/4632461d-0d43-4378-bcf7-bb32bf0de950.jpeg)


## 许可证

[Apache License 2.0](https://github.com/huanghanzhilian/c-shopping/blob/main/LICENSE)

MIT License

Copyright (c) 2024 Jipeng Huang