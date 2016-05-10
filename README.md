## Command line instructions
* Git global setup
	* git config --global user.name "陈子云"
	* git config --global user.email "472206618@qq.com"

* Create a new repository
	* git clone git@gitlab.com:everlose/nodePractice.git
	* cd nodePractice
	* touch README.md
	* git add README.md
	* git commit -m "add README"
	* git push -u origin master

* Existing folder or Git repository
	* cd existing_folder
	* git init
	* git remote add origin git@gitlab.com:everlose/nodePractice.git
	* git add .
	* git commit
	* git push -u origin master

## 文件目录
* babel： es6语法测试
* crawler： node爬虫
* form：node表单提交与http服务器
	* form.jade，server1.js 表单验证
	* upload.html，server2.js 图片上传
* ftp：ftp服务器
* h5：h5项目架构，使用browerify＋gulp
* mathWizard：此项目演示用express+ejs框架搭建页面
* movie：慕课网node建站视频的实战代码
* nodeAPI：整理的node的api用法
	* events 事件模块
	* fs 文件系统模块
	* http http模块
	* querystring 提供一些处理query string的方法，如解析json对象，url编码等。
	* url 提供包含url解析的函数
* nodePPT： nodeppt演示
* seaGulp： sea + gulp架构试验
* uploader： 结构分层的node处理图片上传
* vote：express投票小项目
* vue-hackernews： vue实战项目，clone自github
* weixin： 微信开发练习


