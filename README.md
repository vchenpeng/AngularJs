
基于angular 1.0搭建的前端框架

### 关于工程目录

* js/controllers	存放控制器，正常情况一个页面一个控制器，特殊情况一个页面可多个控制器，但必须有一个主控制器
* js/directives	存放自定义指令
* js/filters		存放自定义过滤器
* js/services		存放服务层，调取api
* all			为压缩后的js文件
* main			入口
* route			路由配置
* libs			公用库
* templates		模板库


### 关于压缩 Uglify

Prerequisites: 压缩前请确保本机已经正确安装nodejs

工程压缩：使用node.js 和r.js，build.js 为配置文件
执行CMD命令：
``` bash
$ node r.js -o build.js
```

 成功会在js文件夹中生成一个all.js
 失败CMD命令中会提示错误信息

### 注意
* libs/assets中存放工程维护性css,img,font，不要分散存放，重要!!
* 所有开发js使用,保证AMD规范,同时有利于Uglify压缩,例子:
   define(['a','b'],function(a,b){
	//TODO
   });
* helper中存放api配置config.js和工具类utils.js
* 非通用css,js不要引入到index.html文件中,此工程最大程度的保证延迟加载，为了保证webapp的启动速度,请勿随意引入全局文件
   对于特定的css,js,directive，你可以在route.js中为单独页面配置，分别对应css和dependencies，二者均为数组[]
* 调用api统一使用var xx = apiService('控制器名称')方式调用，统一控制请求及返回
