const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
  UserId:ObjectId,
  userName:{unique:true,type:String},
  password:String,
  createAt:{type:Date,default:Date.now()},
  lastLoginAt:{type:Date,default:Date.now()}
})

//每次存储数据时都要执行  加盐加密
userSchema.pre('save', function(next){
  //let user = this
  console.log(this)
  bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
    if(err) return next(err)
    bcrypt.hash(this.password,salt, (err,hash)=>{
      if(err) return next(err)
      this.password = hash
      next()
    })

  })
})

// user与数据库库中表的名字一样
// 下面这行可以理解为，mongoose以userSchema为模板规则，在数据库创建一张名字为user的表
mongoose.model('user', userSchema)

