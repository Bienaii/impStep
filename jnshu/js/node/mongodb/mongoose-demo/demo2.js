var mongoose=require('mongoose')
var Schema=mongoose.Schema
// 1、连接数据库
mongoose.connect('mongodb://localhost/test')

// 2、设计集合结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不会有脏数据
var userSchema = new Schema({
    uesername:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require:true
    },
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });

// 3、将文档结构发布为模型
// mongoose.model方法就是用来将一个架构发布为model
    // 第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称，mongoose会自动将大写名词生成小写复数的集合名称
    // 第二个参数：架构Schema
// 返回值：模型构造函数
var User=mongoose.model('User', userSchema)

// 4、当我们有了模型构造函数之后，就可以使用它操作users集合中的数据了
var admin=new User({
    username:'zs',
    password:'123456',
    email: '123456@qq.com'
})

admin.save(function(err,ret){
    if(err){
        console.log('保存失败')
    }else{
        console.log('保存成功')
        console.log(ret)
    }
})

/**
 * 查询数据
 */
// User.find(function(err,ret){
//     if(err){
//         console.log('查询失败')
//     }else{
//         console.log(ret)
//     }
// })

/**
 * 按条件查询所有
 */
// User.find({
//     uesrname:'zs'
// },function(err,ret){
//     if(err){
//         console.log('查询失败')
//     }else{
//         console.log(ret)
//     }
// })

/**
 * 按条件查询单个
 */
// User.findOne({
//     username:'zs',
//     password:'123456'
// },function(err,ret){
//     if(err){
//         console.log('查询失败')
//     }else{
//         console.log(ret)
//     }
// })

/**
 * 更新数据
 */
// User.findByIdAndUpdate('id',{
//     password:'123'
// },function(err,ret){
//     if(err){
//         console.log('failed')
//     }else{
//         console.log(ret)
//     }
// })

/**
 * 删除数据
 */
// User.remove({
//     password:'123456'
// },function(err,ret){
//     if(err){
//         console.log('删除成功')
//     }else{
//         console.log('删除成功')
//         console.log(ret)
//     }
// })
// 根据id删除一个
// findByIdAndRemove(id,[option],callback)


