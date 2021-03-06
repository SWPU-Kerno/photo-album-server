// 加载环境变量
const { loadEnv } = require('./utils/loadEnv')

loadEnv()

const express = require('express')
const mainRouter = require('./routes')

// 读取-打印环境变量
// 读取.env环境变量配置文件

const { serverConfig } = require('./config')

// express 实例
const app = express()

// 注册一些中间件
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ strict: true }))

// 首先进入的路由
app.route('*').all((req, res, next) => {
  console.log(`${req.method}--${req.url}`)
  next()
})
// 注册所有路由
app.use(mainRouter)

app.listen(serverConfig.port, serverConfig.hostname, () => {
  console.log(`server start at ${serverConfig.hostname}:${serverConfig.port}`)
})
