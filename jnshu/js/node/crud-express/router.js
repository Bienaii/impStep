//路由配置
var fs=require('fs')
var Student=require('./student')

//暴露方法，该方法需要一个参数，而app.js中router(app)被调用时就传入了所需要的app实例对象
/**
 * router.js 路由模块
 * 职责：
 *  处理路由
 *  根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要专一，我们划分模块的目的就是为了增强代码的可维护性和开发效率
 */

// 方法二：express提供了一种更好的方式
// 0、专门用来包装路由的
var express=require('express')

// 1、创建一个路由容器
var router=express.Router()

// 2、把路由都挂载到router路由容器中
/**
 * 渲染学生列表页面
 */
router.get('/students',function(req,res){
    // fs.readFile('./db.json','utf8',function(err,data){
    //     if(err){
    //         return res.status(500).send('Server error')
    //     }
    //     res.render('index.html',{
    //         fruits:[
    //             'apple',
    //             'banana',
    //             'orange',
    //             'mango'
    //         ],
    //         // 从文件中读取到的数据一定是字符串，所以这里要转成对象
    //         "students": JSON.parse(data).students
    //     })
    // })
    Student.find(function(err,students){
        if(err){
            return res.status(500).send('server error')
        }
        res.render('index.html',{
            fruits:[
                'apple',
                'banana',
                'orange',
                'mango'
            ],
            // 从文件中读取到的数据一定是字符串，所以这里要转成对象
            "students": students
        })
    })
    
})

/**
 * 渲染添加学生页面
 */
router.get('/students/new',function(req,res){
    res.render('new.html')

})

/**
 * 处理添加的学生信息
 */
router.post('/students/new',function(req,res){
    // 1、获取提交的表单数据
    // 2、处理：将数据保存到db.json文件中用以持久化
    // 3、发送响应
    //      a.先读取出来
    //      b.然后往对象中push数据
    //      c.然后把对象转为字符串
    //      d.然后把字符串再次写入文件
    Student.save(req.body,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })

})

/**
 * 渲染编辑学生页面
 */
router.get('/students/edit',function(req,res){
    // 1. 在客户端的列表页中处理链接问题（需要有id参数）
    // 2. 获取要编辑的学生id
    // 3. 渲染编辑页面
    //      a.根据id把学生信息查出来
    //      b.使用模板引擎渲染页面
    
    Student.findById(parseInt(req.query.id),function(err,student){
        if(err){
            return res.status(500).send('server error')
        }
        // console.log(student)
        res.render('edit.html',{
            student:student
        })
    })
})

/**
 * 处理编辑学生页面
 */
router.post('/students/edit',function(req,res){
    // 1. 获取表单数据：req.bdoy
    // 2. 更新：Student.update
    // 3. 发送响应
    Student.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        // console.log(req.body)
        res.redirect('/students')
    })
})

/**
 * 处理刪除学生页面
 */
router.get('/students/delete',function(req,res){
    // console.log(req.query.id)
    Student.deleteById(req.query.id,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })
    
})

// 3、把router导出
module.exports=router


// 方法一：此方法并非最好的解决方法
// module.exports=function(app){
//     app.get('/students/',function(req,res){s
//         fs.readFile('./db.json','utf8',function(err,data){
//             if(err){
//                 return res.status(500).send('Server error')
//             }
//             res.render('index.html',{
//                 fruits:[
//                     'apple',
//                     'banana',
//                     'orange',
//                     'mango'
//                 ],
//                 // 从文件中读取到的数据一定是字符串，所以这里要转成对象
//                 "students": JSON.parse(data).students
//             })
//         })
        
//     })
    
//     app.get('/students/new',function(req,res){
        
//     })
//     app.get('/students/new',function(req,res){
        
//     })
//     app.get('/students/new',function(req,res){
        
//     })
//     app.get('/students/new',function(req,res){
        
//     })
//     app.get('/students/new',function(req,res){
        
//     })
// }