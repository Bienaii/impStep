
var http = require('http')


var server = http.createServer()

// request请求事件处理函数，需要接受两个参数:
    // Request请求对象：可以用来获取客户端的一些请求信息，例如请求路径
    // Response响应对象：可以用来给客户端发送响应信息
server.on('request', function (request,response) {
    //  http://127.0.0.1:3000/        路径为/
    //  http://127.0.0.1:3000/a       路径为/a
    //  http://127.0.0.1:3000/foo/b   路径为/foo/b
    console.log('收到客户端的请求了，请求路径是：'+request.url)

    // response对象有一个方法：write ，可以用来给客服端发送响应数据
    // write可以使用多次，但是最后一定要使用end来结束响应，否则客服端会一直等待
    response.write('hello')
    response.write(' node.js')

    //告诉客户端，响应完成，可以呈递给用户了
    response.end()
    //由于此时的服务器能力还非常弱，无论什么请求，都只能响应hello node.js

})


server.listen(3000, function () {
    console.log('服务器启动成功了，可以通过http://127.0.0.1:3000/来进行访问')
})