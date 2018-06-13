const Koa = require('koa')
const app = new Koa()
//引入connect
const {connect, initSchemas} = require('./database/init.js')
const mongoose = require('mongoose')

let user = require('./appApi/user')
const Router = require('koa-router')

// 用来处理post请求
const bodyParser = require('koa-bodyparser')
app.use(bodyParser());
//处理跨域请求
const cors = require('koa2-cors')
app.use(cors())
// //立即执行函数
// ;(async () =>{
//   await connect()
//   initSchemas()
//   const User = mongoose.model('user')
//   let oneUser = new User({userName:'jspang',password:'123456'})
//   oneUser.save().then(()=>{
//     console.log('插入成功')
//   })
// })()

// 加载所有子路有
let router = new Router()
router.use('/user', user.routes())
// app.use(async(ctx)=>{
//   ctx.body = '<h1>hello Koa2</h1>'
// })

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

app.use((ctx) => {
  ctx.body = '<h1>Hello Koa2</h1>'
})
app.listen(3000, () => {
  console.log("listen 3000")
})
