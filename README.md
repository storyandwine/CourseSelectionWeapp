# 项目快抢微信选课小程序
本项目采用微信云开发中的云存储，云数据库，以及云函数。

前端页面主要为vant-weapp有赞提供的开源组件

## 项目使用

git下载本仓库，在微信开发者工具中导入即可，需要填写自己的APPID 并勾选使用云开发

之后进行Npm构建，把vant组件构建到小程序内

## 项目简介

某愣头青因为学校综合实训选题的时候，体验不是很好（之前学校选项目的方式是聊天软件私聊班长报名，就导致看一个发现没有余量了，再看一个又没余量了），因此选择在征得老师同意下，修改了自己的实训课题，做一个项目选择的小程序，希望可以改善后人的体验。

## 数据流图

![img](https://ws1.sinaimg.cn/large/005VVb5fgy1g4vmx9ymd9j30d402vdfn.jpg)

 

![img](https://ws1.sinaimg.cn/large/005VVb5fgy1g4vmy13khlj30is0fc74g.jpg)

## 数据字典

 ![img](https://ws1.sinaimg.cn/large/005VVb5fgy1g4vmyvryqhj30i9090aa0.jpg)

## index模块设计说明

1. 模块描述

     整个小程序的主页，里面展示了所有的项目信息

2. 功能

     实现下拉刷新以及懒加载，选课查看文档等功能

3. 交互的模块

   cloud.database,vant-card

4. 模块设计
    **主要方法：**

  getpdf():绑定查看文档的button，先从云存储中下载文档，再调用微信本地接口进行预览。

  select:选课逻辑，其中包括更新课程信息，余量（-1），判断余量是否充足，写入userinfo集合等

  dialog:提示框，指引用户走向正确的使用道路

  onload:打开页面时就开始加载的数据

  onPullDownRefresh:监听用户下拉动作，实现下拉刷新

  onReachBottom：上拉触底之后，更新下一页的数据

 

##  add模块设计说明

1. 模块描述

教师开课

2. 功能

   在验证教师身份无误之后，实现开设课程的功能

3. 交互的模块
userinfo

4. 模块设计
    **主要方法：**

  upload:上传项目文档，读取聊天文件，并把文件上传到云存储中

  onChange:监听输入框，赋值给后端

  setData:更新页面的缓存数据，统一格式，便于数据库更新

  onLoad:页面加载的时候判断用户身份，看是否是教师，如果不是，弹出不可开课的提示，如果是教师则获取教师的名字

submit:向数据库提交新开设的课程信息

## user模块设计说明

1. 模块描述

   我的界面

2. 功能

   查看我的课程，更新个人信息,用户意见反馈

 

3. 交互的模块

   userinfo,myclass,tucao

4. 模块设计

  **主要方法：**

  tucao:传入小程序信息给tucao.qq.com实现用户反馈信息管理

  navigateTo:导航到下个页面

  swiper:轮播图实现

  onChange:选择器的实现，选择用户身份

  onload:加载个人信息，如果已经有信息了，则显示出来，不允许再次更新了

  backCourse：退选

  dialog:弹出对话框提示用户

## 参考文档

https://youzan.github.io/vant-weapp/#/

https://developers.weixin.qq.com/miniprogram/dev/framework/

https://ke.qq.com/course/365835