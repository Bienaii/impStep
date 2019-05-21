// 为了方便地统一处理静态资源，约定把所有的静态资源都存放在统一目录（public）中
// 本例实现留言板功能
var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

// 评论功能
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

http
    .createServer(function (req, res) { //简写方式，该函数直接被注册为server的request请求处理函数
        var parseObj = url.parse(req.url, true)
        //单独获取不包含查询字符串的路径部分（即不包含？及之后的内容）
        var pathname = parseObj.pathname

        if (pathname === '/') {
            fs.readFile('./views/index.html', function (err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                }
                var htmlStr = template.render(data.toString(), {
                    comments: comments
                })
                res.end(htmlStr)
            })
        } else if (pathname === '/post') { //相对应的，index.html里的a标签的href属性值也应为/post
            fs.readFile('./views/post.html', function (err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        } else if (pathname.indexOf('/public/') === 0) {
            //统一处理：
            // 如果请求路径是以/public/开头的，则我认为你要获取public中的某个资源
            // 所以我们就直接可以把请求路径当做文件路径来直接进行读取-
            fs.readFile('.' + pathname, function (err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        } else if (pathname === '/pinglun') {
            // 一次请求对应一次响应，响应结束，这次请求也就结束了
            // res.end(JSON.stringify(parseObj.query))
            var comment = parseObj.query
            comment.dateTime = '2018-4-22 21:30:00'
            //最新显示在最上面
            comments.unshift(comment)
            //服务端这个时候已经把数据存储好了，接下来就是让用户重新请求/首页，就可以看到最新的留言内容了
            //如何通过服务器让客户端重定向：设置状态码为302，在响应头中通过location告诉客户端往哪定向
            res.statusCode = 302
            res.setHeader('Location', '/');
            res.end();


        }
    })
    .listen(3000, function () {
        console.log('server is running')
    })