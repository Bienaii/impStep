var http = require('http')
var server = http.createServer()
server.on('request', function (req, res) {
    // 在服务端默认发送的数据，其实是utf-8编码的内容
    // 但是浏览器不知道你是utf-8编码的内容，在这种情况下，浏览器会按照 当前操作系统的默认编码去解析
    // 中文操作系统默认是gbk
    // 解决方法：告诉浏览器发送的内容是什么编码的，http协议中，content-type就是告知发送的数据内容是什么类型的
    // text/plain 普通文本 
    // res.setHeader('Content-type','text/plain;charset=utf-8')

    // res.end('hello 世界')

    var url = req.url
    if (url === '/plain') {
        // text/plain 普通文本 
        res.setHeader('Content-type', 'text/plain;charset=utf-8')
        res.end('hello 世界')
    } else if (url === '/html') {
        // 如果发送的是html格式的字符串，则也要告诉浏览器发送的是text/html格式的内容
        res.setHeader('Content-type', 'text/html;charset=utf-8')
        res.end('<p>hello html<a href="">点我</a></p>')
    }
})
server.listen(3000, function () {
    console.log('server is runnning...')
})