// 本例演示url模块的简单用法
var url=require('url')
// 使用url.parse方法将路径解析为一个方便操作的对象，第二个参数为true表示直接将查询字符串转为一个对象（通过query属性访问）
var obj=url.parse('/pinglun?name=fsjalfjddsjlz&message=qeiqwyru',true)
//输出该对象
console.log(obj)
//单独获取不包含查询字符串的路径部分（即不包含？及之后的内容），即/pinglun
console.log(obj.pathname)
//单独获取包含问好之后的内容，即?name=fsjalfjddsjlz&message=qeiqwyru
//实际输出为{ name: 'fsjalfjddsjlz', message: 'qeiqwyru' }
console.log(obj.query)