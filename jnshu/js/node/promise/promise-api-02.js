//此例演示封装promise版本的readFile 
var fs=require('fs')

function ReadFile(filePath){
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

ReadFile('./data/a.txt')
    .then(function(data){
        console.log(data)
        return ReadFile('./data/b.txt')
    })
    .then(function(data){
        console.log(data)
        return ReadFile('./data/c.txt')
    })
    .then(function(data){
        console.log(data)
    })
