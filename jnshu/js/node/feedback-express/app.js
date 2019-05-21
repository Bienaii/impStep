// 本例使用express重写feedback留言板案例
var express = require('express')

var app = express()

var comments = [{
        name: 'zhangsan',
        message: 'nice day',
        dateTime: '2018-04-22'
    },
    {
        name: 'lisi',
        message: 'nice day',
        dateTime: '2018-04-22'
    },
    {
        name: 'wangwu',
        message: 'nice day',
        dateTime: '2018-04-22'
    },
    {
        name: 'dailiu',
        message: 'nice day',
        dateTime: '2018-04-22'
    }
]

app.use('/public/', express.static('./public')) //后面这个是文件路径，可省略./ /，建议加上

// 配置使用art-template模板引擎
// 第一个参数表示，当渲染以.art结尾的文件的时候，使用art-template模板引擎
// express-art-template是专门用来在express中吧art-template整合到express中
// 此处不需要加载art-template但却安装，是因为express-art-template依赖了art-template
// app.engine('art',require('express-art-template'))

//如果不习惯.art后缀名，可以将app.engine()中的参数该为html，相应的文件后缀名也应该更新
app.engine('html', require('express-art-template'))

//express为response响应对象提供了一个方法：render
// render 方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
// res.render('html模板名',{模板数据}) 
//第一个参数不能写路径，默认回去项目中的views目录查找该模板文件
// 也就是说express有一个默认约定：开发人员把所有的视图文件都放到views中

//此处render第二个参数使用框架
app.get('/', function (req, res) {
    res.render('index.html', {
        comments: comments
    })
})


app.get('/post', function (req, res) {
    res.render('post.html')
})

app.get('/pinglun',function(req,res){
    var comment=req.query
    // query只能拿get方法的请求参数，不能拿其他如post的
    comment.dataTime='2018-4-27 14:00:00'
    comments.unshift(comment)
    res.redirect('/')   //使用框架提供的简单方法,还会自动结束响应，不用res.end()
    // 当然原生的也依旧可以使用
    // res.statusCode=302
    // res.setHeader('Location','/')
})
app.listen(3000, function () {
    console.log('server is running')
})
