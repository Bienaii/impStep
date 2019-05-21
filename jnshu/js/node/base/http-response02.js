//由于此时的服务器能力还非常弱，无论什么请求，都只能响应hello node.js
var http = require('http')
//思考：我希望当请求不同的路径时，响应不同的结果
// 例如：/index 注册   /login 登录
//判断request.url

// 1. 创建Server
var server = http.createServer()

// 2. 监听request请求事件，设置请求处理函数
server.on('request', function (req, res) {
    // console.log('收到请求了，请求路径是' + req.url)
    // console.log('请求我的该客户端的地址是是：'+req.socket.remoteAddress)
    // console.log('请求我的该客户端的端口号是：'+req.socket.remotePort)
    //即网络通信是需要知道双方的端口号的（所有需要联网通信的软件都必须具有端口号）
    
    // res.write('hey')
    // res.write(',world')
    // res.end()

    //上述方式比较繁琐，推荐直接在end中说明响应内容
    // res.end('heyhey world')

    //根据不同的请求路径，响应不同的结果
    // 1. 获取请求路径：req.url获取到的是端口号后面的那一部分路径，也就是说所有的url都是以/开头的
    // 2. 判断路径  处理响应
    var url = req.url
    if (url === '/') {
        res.end('index page')
    } else if (url === '/login') {
        res.end('login page')
    }else if(url==='/products'){
        var products=[
            {
                name:'apple x',
                price:7777
            },
            {
                name:'nokia x',
                price:6666
            },
            {
                name:'huawei mate 20',
                price:3999
            }
        ]
        // 响应内容只能是二进制或字符串；  数字、对象、数组等需要转
        res.end(JSON.stringify(products))
    }
    else {
        res.end('404 Not Found.')
    }
    
})
// 3. 绑定端口号，启动服务
server.listen(3000, function () {
    console.log('服务器启动成功，可以访问了！')
})