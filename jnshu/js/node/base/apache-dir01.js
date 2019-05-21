//本例实现apache www目录功能
var http=require('http')
var fs=require('fs')
var server=http.createServer()
var wwwDir='D:/app/www'
server.on('request',function(req,res){
    console.log('received request')
    var url=req.url
    var filePath='/index.html'
    if(url!=='/'){
        filePath=url
    }
    fs.readFile(wwwDir+filePath,function(error,data){
        if(error){
            return res.end('404 Not Found.')
        }
        res.end(data)
    })
    
    
})

server.listen(3000,function(){
    console.log('server is running')
})