var fs = require('fs')
//readFile接受两个参数
//回调函数接受两个参数，error值为null或错误对象，data为undefined或数据
fs.readFile('hello.txt', function (error, data) {
    console.log(data.toString())
  
})
//writeFile接受三个参数，其中第三个参数回调函数中只有一个error参数
fs.writeFile('hello.txt','你好，world',function(error){
    console.log(error)
})