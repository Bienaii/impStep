// ES6 新增了一个API Promise,解决回调地狱：callback hell
// Promise是一个构造函数，它本身不是异步，但内部往往封装一个异步任务
var fs = require('fs')
// 创建Promise容器
// 1、给一个承诺：Promise容器一旦创建，就开始执行里面的代码
// console.log(1)

var p1 = new Promise(function (resolve, reject) {
    // console.log(2)
    fs.readFile('./data/a.txt', 'utf8', function (err, data) {
        if (err) {
            // 失败了，承诺容器中的任务失败了
            // console.log(err)
            // 把容器的Pending状态变为Rejected
            // 调用reject就相当于调用了then方法的第二个参数函数
            reject(err)
        } else {
            // 承诺成功了
            // console.log(3)
            // console.log(data)
            // 把容器的Pending状态变为Resolved
            // 调用resolve就相当于调用了then方法的第一个参数函数
            resolve(data)
        }

    })
})

var p2 = new Promise(function (resolve, reject) {

    fs.readFile('./data/b.txt', 'utf8', function (err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }

    })
})

var p3 = new Promise(function (resolve, reject) {

    fs.readFile('./data/c.txt', 'utf8', function (err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }

    })
})


//p1就是那个承诺，当p1成功了，然后（then）做指定操作 
// then方法接受的function就是容器中的resolve函数
p1
    .then(function (data) {
        console.log(data)
        // 当 p1 读取成功时，当前函数中return的结果就可以在后面的then中的function接收到
        // 即当你return 123，后面就接收到123
        // return 123
        // 即return一个promise对象时，后续的then中的方法的第一个参数会作为p2的resolve
        return p2
    }, function (err) {
        console.log('读取失败', err)
    })
    .then(function (data) {  //p2的resolve； reject省略了
        // 若前面return 123，这里就接收到123
        console.log(data)
        return p3
    })
    .then(function (data) {
        console.log(data)
    })