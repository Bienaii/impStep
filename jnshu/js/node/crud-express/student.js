/**
 * student.js 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 */
// node核心
var fs = require('fs')
var dbPath = './db.json'
/**
 * 获取所有学生列表
 * callback中的参数：
 *      第一个参数是err：成功是null，错误是错误对象
 *      第二个参数是结果：成功是数组，错误是undefined
 */
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8',function (err, data) {
        if (err) {
            return callback(err) //没有传第二个参数，为undefined
        }
        callback(null, JSON.parse(data).students) //得到学生数组
    })
}
/**
 * 根据id获取学生对象信息
 * callback 回调函数
 */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function (item) {
            return item.id === parseInt(id)
        })
        callback(null, ret)
    })
}

/**
 * 添加、保存学生信息
 */
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err) //没有传第二个参数，为undefined
        }
        var students = JSON.parse(data).students
        // 处理id是唯一的，不重复
        student.id = students[students.length - 1].id + 1
        // 那用户传递的对象保存到数组中
        students.push(student)
        // 把对象转换为字符串
        var fileData = JSON.stringify({
            students: students
        })
        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                // 错误就把错误对象传递给它
                return callback(err)
            }
            // 成功就无错，所以错误对象是 null
            callback(null)
        })
    })
}

/**
 * 更新学生信息
 */
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        // 注意：这里记得把 id 统一转换为数字
        student.id=parseInt(student.id)

        // 要修改谁，就需要把谁找出来
        // EcmaScript6 中的一个数组方法：find，需要接收一个函数作为参数
        // 当某个遍历项符合item.id===student.id 条件时，find会终止遍历，同时返回遍历项
        var stu = students.find(function (item) {
            return item.id === student.id
        })

        // 这种方式太笨，写死了，即有100个就需要写一百次
        // stu.name=student.name

        // 遍历拷贝对象
        for (var key in student) {
            stu[key] = student[key]
        }
        var fileData = JSON.stringify({
            students: students
        })
        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                // 错误就把错误对象传递给它
                return callback(err)
            }
            // 成功就无错，所以错误对象是 null
            callback(null)
        })

    })

}

/**
 * 删除学生信息
 */
exports.deleteById = function (id,callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err) //没有传第二个参数，为undefined
        }
        var students = JSON.parse(data).students
        
        var deleteId =students.findIndex(function (item){
            return item.id===parseInt(id)
        })
        students.splice(deleteId,1)

        var fileData = JSON.stringify({
            students: students
        })
        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                // 错误就把错误对象传递给它
                return callback(err)
            }
            // 成功就无错，所以错误对象是 null
            callback(null)
        })
    })

}