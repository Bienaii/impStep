// 此例演示系统的增加(Create)、读取查询(Read)、更新(Update)和删除(Delete)
//app.js 为入口模块 
/**
 * 职责：
 *  创建服务
 *  做一些服务相关配置：
 *      模板引擎
 *      body-parser解析表单post请求体
 *      提供静态资源服务
 *  挂载路由
 *  监听端口，启动服务器
 */
var express=require('express')
var router=require('./router')
var bodyParser=require('body-parser')
var app=express()
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

// 配置模板引擎和body-parser一定要在app.use(router)挂载路由之前
// 配置 body-parser 中间件(插件,专门用来解析表单post请求体)
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false }))
// parse application/json
app.use(bodyParser.json())


// 把路由容器挂载到app服务中
app.use(router)

app.engine('html',require('express-art-template'))

app.listen(3000,function(){
    console.log('server is running')
})
