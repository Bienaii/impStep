var mongoose = require('mongoose');

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
// mongoose.Promise=global.Promise;

// 创建一个模型，就是在设计数据库
// MongoDB 是动态的，非常灵活，只需要在代码中设计你喜欢的数据库就可以了
// mongoose这个包就可以让你的设计编写过程变得非常简单
var Cat = mongoose.model('Cat', { name: String });

// 实例化一个Cat
var kitty = new Cat({ name: 'Zildjian' });

// 持久化保存kitty实例
kitty.save(function(err){
    if(err){
        console.log(err)
    }else(
        console.log('meow')
    )
})