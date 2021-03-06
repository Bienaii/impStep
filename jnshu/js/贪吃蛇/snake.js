//自调用函数----小蛇
(function () {
    var elements = []; //存放小蛇的每个身体部分
    //小蛇的构造函数
    function Snake(width, height, direction) {
        //小蛇的每个部分的宽高
        this.width = width || 20;
        this.height = height || 20;
        //小蛇的身体
        this.body = [{
                x: 3,
                y: 2,
                color: "red"
            }, //头
            {
                x: 2,
                y: 2,
                color: "orange"
            }, //身体
            {
                x: 1,
                y: 2,
                color: "orange"
            } //身体

        ];
        //移动方向
        this.direction = direction || "right";
    }
    //为原型添加方法----小蛇的初始化方法
    Snake.prototype.init = function (map) {
        //先删除之前的小蛇
        remove();

        //循环遍历创建div
        for (var i = 0; i < this.body.length; i++) {
            //数组中的每个元素都是一个对象
            var obj = this.body[i];
            //创建div
            var div = document.createElement("div");
            //把div加入到map地图中
            map.appendChild(div);
            //设置div的样式
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";

            //横纵坐标
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";

            div.style.backgroundColor = obj.color;
            //方向

            //把div加入到数组elements中，方便后面删除
            elements.push(div);
        }

    }

    //为原型添加方法----小蛇的移动
    Snake.prototype.move = function (food, map) {
        //改变小蛇的身体的坐标位置
        var i = this.body.length - 1; //2
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //判断方向---改变小蛇的头的坐标位置
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }

        //判断有没有吃到食物（小蛇的坐标与食物一致）
        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;

        //判断
        if (headX == food.x && headY == food.y) {
            //获取小蛇的尾巴
            var last = this.body[this.body.length - 1]
            // 把最后的蛇尾复制一个，接上小蛇
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            //把被吃掉的食物删除,再初始化一个食物
            food.init(map);
        }


    }

    //私有函数----删除小蛇
    function remove() {
        //移动原理，从蛇尾开始删
        //获取数组
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            //先从先前的子元素中找到该子元素的父级元素，然后再删除这个子元素
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    }

    //把Snake暴露给window
    window.Snake = Snake;
}());