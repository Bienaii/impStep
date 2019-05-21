//自调用函数-----食物的
(function () {
    var elements = []; //用来保存每个小方块持物的

    //食物就是一个对象,有宽，有高，有颜色，有横纵坐标
    //先定义构造函数，然后创建对象
    function Food(x, y, width, height, color) {
        //横纵坐标
        this.x = x || 0;
        this.y = y || 0;
        //宽和高
        this.width = width || 20;
        this.height = height || 20;
        //背景颜色
        this.color = color || "green";
    }

    //为原型添加初始化的方法(作用：在页面上显示食物)
    //因为食物要在地图上显示，所以，需要地图这个参数(map---就是页面上的.class=map的这个div)
    Food.prototype.init = function (map) {
        //初始化之前先删除这个食物
        //外部无法访问的函数
        remove();

        //创建div
        var div = document.createElement("div");
        //把div加到map中
        map.appendChild(div);
        //为div设置样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        //脱离文档流
        div.style.position = "absolute";
        //随机横纵坐标
        //地图宽度(高度)除于每个持物的宽度(高度)，表示最多能放入多少个小方块
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this
            .width; //乘以食物宽度，此时坐标的一个单位为(width)
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this
            .height; //乘以食物高度，此时坐标的一个单位为(height)
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";

        //把div加入到数组elements中，方便后面删除
        elements.push(div);
    }

    //私有函数-----删除食物的
    function remove() {
        //elements数组中有这个食物
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            //找到这个子元素的父级元素(map)，然后删除这个子元素
            ele.parentNode.removeChild(ele);
            //elements中的这个子元素也要删除
            elements.splice(i, 1);
        }
    }

    //把Food暴露给window，使外部可以使用
    window.Food = Food;
}());