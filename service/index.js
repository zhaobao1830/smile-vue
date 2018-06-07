const Koa = require('koa')
const app = new Koa()
//引入connect
const {connect, initSchemas} = require('./database/init.js')
const mongoose = require('mongoose')

//立即执行函数
;(async () =>{
  await connect()
  initSchemas()
  const User = mongoose.model('user')
  let oneUser = new User({userName:'jspang',password:'123456'})
  oneUser.save().then(()=>{
    console.log('插入成功')
  })
})()

app.use((ctx) => {
  ctx.body = '<h1>Hello Koa2</h1>'
})
app.listen(3000, () => {
  console.log("listen 3000")
})
