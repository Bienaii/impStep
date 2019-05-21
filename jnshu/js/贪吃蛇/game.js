//自调用函数----整个游戏对象
(function () {
    //该变量的目的就是为了保存游戏Game的实例对象
    var that = null;
    //游戏的 构造函数
    function Game(map) {
        this.food = new Food(); //食物对象
        this.snake = new Snake(); //小蛇对象
        this.map = map;
        that = this;
    }

    //初始化游戏----小蛇和食物可以显示出来
    Game.prototype.init = function () {
        //初始化游戏
        //食物初始化
        this.food.init(this.map);
        
        //小蛇初始化
        this.snake.init(this.map);

        //原型方法可以调用原型方法
        //调用自动移动小蛇的方法
        this.runSnake(this.food, this.map);

        //调用按键方法
        this.bindKey();

        //计时器
        //setInterval的this是window
        // setInterval(function(){
        //     that.snake.move(that.food,that.map);//小蛇移动
        //     that.snake.init(that.map);
        // },150)


        // this.snake.move(this.food,this.map);
        // this.snake.init(this.map);
    };

    //添加原型方法----设置小蛇可以自动的跑起来
    Game.prototype.runSnake = function (food, map) {

        //自动地移动
        var timeId = setInterval(function () {
            //此时的this是window
            //移动小蛇
            this.snake.move(food, map);
            //初始化小蛇
            this.snake.init(map);
            //横纵坐标的最大值
            var maxX = map.offsetWidth / this.snake.width;
            // console.log(maxX+"===="+this.snake.body[0].x);
            var maxY = map.offsetHeight / this.snake.height;
            //小蛇的头的坐标
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            //横坐标的判断
            if (headX < 0 || headX >= maxX) {
                //撞墙了,停止定时器
                clearInterval(timeId);
                alert("游戏结束");
            }
            //纵坐标的判断
            if (headY < 0 || headY >= maxY) {
                //撞墙了，停止定时器
                clearInterval(timeId);
                alert("游戏结束");
            }

            //小蛇撞到自己，游戏结束
            for (var i = 1; i <= this.snake.body.length; i++) {
                if (headX == this.snake.body[i].x && headY == this.snake.body[i].y) {
                    clearInterval(timeId);
                    alert("游戏结束");
                }
            }
        }.bind(that), 100); //使用bind()方法后，setInterval里的this被绑定为that，不再是window；若不设置，小蛇不会动，因为this指向window

    }

    //添加原型方法----设置用户按键，改变小蛇移动方向
    Game.prototype.bindKey = function () {
        //获取用户的按键，改变小蛇的方向
        document.addEventListener("keydown", function (e) {
            //这里的this应该是触发keydown的事件的对象----document
            //所以，这里的this就是document,通过bind(that)使this指向游戏对象gm
            //获取按键值
            switch (e.keyCode) {
                case 37:
                    if (this.snake.direction != "right") {
                        this.snake.direction = "left";
                    }
                    break;
                case 38:
                    if (this.snake.direction != "bottom") {
                        this.snake.direction = "top";
                    }
                    break;
                case 39:
                    if (this.snake.direction != "left") {
                        this.snake.direction = "right";
                    }
                    break;
                case 40:
                    if (this.snake.direction != "top") {
                        this.snake.direction = "bottom";
                    }
                    break;
            }
        }.bind(that), false)
    };

    //把Game暴露给window
    window.Game = Game;

}());