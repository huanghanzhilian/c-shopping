<p align="center">
	<img alt="logo" src="https://www.cheerspublishing.com/uploads/article/3ce26e55-1e14-4e51-aec1-1c18533f953c.png" width="300">
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">C-Shopping v1.1.1</h1>
<h4 align="center">基于Nextjs开发同时适配Desktop、Tablet、Phone多种设备的精美购物平台</h4>

## 前言

`c-shopping`是一个精美的web电商系统，支持响应式交互，界面优雅，功能丰富，小巧迅速，包含一个电商平台MVP完整功能，具备良好的审美风格与编码设计。

希望来的人，有所收获。故事不结束，青春不散场。

## 项目介绍

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
|首页|<img src="https://www.cheerspublishing.com/uploads/article/e19de1c1-d104-4496-beed-9aedec13651b.gif" />|<img src="https://www.cheerspublishing.com/uploads/article/cb1e4f8f-aab4-4b83-8cf5-13558bb8f6dc.gif" />|
|二级分类|<img src="https://www.cheerspublishing.com/uploads/article/51c65301-e46c-4e35-877a-eed037fa3f85.png" />|<img src="https://www.cheerspublishing.com/uploads/article/542c8bf9-344a-4c19-a9e3-27bc0ec92bd5.png" />|
|三级分类|<img src="https://www.cheerspublishing.com/uploads/article/6cf773b4-7eb0-4f8d-88a4-49d64a644c11.png" />|<img src="https://www.cheerspublishing.com/uploads/article/f90b95ba-4b43-48fa-bf70-7736fcc7f9c5.png" />|
|商品详情|<img src="https://www.cheerspublishing.com/uploads/article/5430a5f3-bec9-4bc8-9d7d-bd63500b4634.png" />|<img src="https://www.cheerspublishing.com/uploads/article/eb4ae7db-c490-4af2-a99c-d0b10fd6c01e.png" />|
|登录|<img src="https://www.cheerspublishing.com/uploads/article/47463491-1ae7-4da9-b320-a5f2310050e6.png" />|<img src="https://www.cheerspublishing.com/uploads/article/3ec1a909-294c-40d5-98dd-8c890cd8eba2.png" />|
|注册|<img src="https://www.cheerspublishing.com/uploads/article/4dfd1995-4461-4def-a612-9efbf7ada97e.png" />|<img src="https://www.cheerspublishing.com/uploads/article/88d32659-0a3d-453c-8f2d-daa8e4ee1b14.png" />|
|搜索|<img src="https://www.cheerspublishing.com/uploads/article/78c6b074-3e30-432e-b9a3-a0328d4c9b2e.png" />|<img src="https://www.cheerspublishing.com/uploads/article/52518186-e141-4614-8da8-c38a31c7895b.png" />|
|购物车|<img src="https://www.cheerspublishing.com/uploads/article/77ea077a-3da1-4183-80b5-7f5f32f28a9a.png" />|<img src="https://www.cheerspublishing.com/uploads/article/17578ef8-1af0-4b03-9942-f5f805d9045b.png" />|
|支付页|<img src="https://www.cheerspublishing.com/uploads/article/aeee44cb-59e8-4752-9a55-f8b80bbacb65.png" />|<img src="https://www.cheerspublishing.com/uploads/article/334c73aa-db17-4624-8e0f-c7ea44236974.png" />|
|个人中心|<img src="https://www.cheerspublishing.com/uploads/article/8e2260fc-fecb-43b9-b61e-ffa3d3fae2cf.png" />|<img src="https://www.cheerspublishing.com/uploads/article/a671fef1-401c-4c3d-9a1d-6cd59ecb9d63.png" />|
|我的订单|<img src="https://www.cheerspublishing.com/uploads/article/e27258b6-e3a5-4fd4-9899-938d3c790e64.png" />|<img src="https://www.cheerspublishing.com/uploads/article/8114f995-495c-4044-8b6b-2ef2a746d125.png" />|
|我的评论|<img src="https://www.cheerspublishing.com/uploads/article/280ff949-57b3-426d-ab4e-5b893269c9de.png" />|<img src="https://www.cheerspublishing.com/uploads/article/686c0dd9-d9a0-4ff3-9953-eef499349930.png" />|
|地址管理|<img src="https://www.cheerspublishing.com/uploads/article/61341306-61fa-4f4a-90e9-5ddba6ccbc31.png" />|<img src="https://www.cheerspublishing.com/uploads/article/d4448bfc-40b0-4b18-ae47-c3a9f9884918.png" />|
|近期访问|<img src="https://www.cheerspublishing.com/uploads/article/11e81506-f193-447f-a15f-a58bfa3c1eba.png" />|<img src="https://www.cheerspublishing.com/uploads/article/73a67a1d-a9ae-4ded-990a-4ef172671d34.png" />|


#### 管理端

|模块|Desktop devices|Mobile devices|
|--|------------|--|
|登录|<img src="https://www.cheerspublishing.com/uploads/article/1fe8a191-39ef-4e2c-ac47-d3dbe5eb298b.png" />|<img src="https://www.cheerspublishing.com/uploads/article/d3995bbe-df4f-490a-b8df-998932840ab6.png" />|
|管理中心|<img src="https://www.cheerspublishing.com/uploads/article/dc958727-4885-4756-ba86-40288be61592.png" />|<img src="https://www.cheerspublishing.com/uploads/article/633169d7-a616-40fc-8970-d79748734873.png" />|
|用户管理|<img src="https://www.cheerspublishing.com/uploads/article/a1b80250-3059-482c-8906-a0432743f2a8.png" />|<img src="https://www.cheerspublishing.com/uploads/article/ad6fa92c-2bda-4391-9c93-e59fdeff59c3.png" />|
|分类管理|<img src="https://www.cheerspublishing.com/uploads/article/16f95176-ae39-4564-b21a-2f581bda083c.png" />|<img src="https://www.cheerspublishing.com/uploads/article/458eb6ab-2c88-4654-8262-81dffe0b3c66.png" />|
|分类管理树状|<img src="https://www.cheerspublishing.com/uploads/article/c0fd1262-2c0f-4178-839e-a420c5b1bca4.png" />|<img src="https://www.cheerspublishing.com/uploads/article/27516b00-c0e0-4a12-aedc-a9f64f64db1b.png" />|
|规格管理|<img src="https://www.cheerspublishing.com/uploads/article/81442fb9-1a76-4fee-84e2-d864c0b28523.png" />|<img src="https://www.cheerspublishing.com/uploads/article/b96bc0fe-ad45-4b1c-b4d9-945e675cc7b9.png" />|
|商品管理|<img src="https://www.cheerspublishing.com/uploads/article/3b81e653-34b8-4b48-8a47-f9fa0b6dda6c.png" />|<img src="https://www.cheerspublishing.com/uploads/article/1d9b03aa-8673-4405-ad2f-2d61e413c114.png" />|
|订单管理|<img src="https://www.cheerspublishing.com/uploads/article/7279fb05-5a5a-4eb6-80e7-5341e78e415d.png" />|<img src="https://www.cheerspublishing.com/uploads/article/7ac7850b-798c-4954-95ad-3fab562bf418.png" />|
|评论管理|<img src="https://www.cheerspublishing.com/uploads/article/17f3ef2a-c7f0-474a-9964-22b9616d7ba0.png" />|<img src="https://www.cheerspublishing.com/uploads/article/0df0021a-626f-452c-b4dc-d9b0c927d4e3.png" />|
|滑块管理|<img src="https://www.cheerspublishing.com/uploads/article/ab54214b-b651-4698-aba1-fa436c69adc7.png" />|<img src="https://www.cheerspublishing.com/uploads/article/b695af32-cd0e-4009-a278-adb2a4f22b2f.png" />|
|banner管理|<img src="https://www.cheerspublishing.com/uploads/article/fac6ecd5-b480-4db6-9578-146052304a4e.png" />|<img src="https://www.cheerspublishing.com/uploads/article/7bc682e2-60c2-45f3-80c3-e94ade1223b2.png" />|





