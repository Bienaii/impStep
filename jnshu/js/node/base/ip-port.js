//ip地址是用来定位计算机的
//端口号是用来定位具体的应用程序
//所有需要联网通信的应用程序都会占用一个端口号
console.log('请求我的该客户端的地址是是：'+req.socket.remoteAddress)
console.log('请求我的该客户端的端口号是：'+req.socket.remotePort)
//即网络通信是需要知道双方的端口号的

// 对于作为请求方的客户端：浏览器会自动申请未占用的端口号
// 端口号的范围0--65536
//计算机中有一些默认的端口号，尽量不要去使用，因为可能已经被占用，如Apache：8080   http：80（网站上线部署时使用）