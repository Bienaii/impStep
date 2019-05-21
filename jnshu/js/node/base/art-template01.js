// 此例演示在node中使用art-template
var tpl=require('art-template')

//浏览器用法：template('script id',{对象})

// render接受两个参数：模板字符串、解析替换对象 ； name的值会被渲染到{{name}}中
var result=tpl.render('hello {{name}}',{
    name:'Jack' 
})

console.log(result)