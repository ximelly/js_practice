const http=require("http");
const io=require("socket.io");

let server=http.createServer(()=>{

})
server.listen(8080);
let wx=io.listen(server);
wx.on("connection",(socket)=>{
    console.log("链接上了");
    socket.on("data",data=>{
        console.log(data);
        socket.emit("change","服务器的数据改变啦");
    });
})


/*发送信息
    xxx为事件名称
    socket.on("xxx",data=>{
        console.log(data);
    });

接收信息    
    socket.emit("xxx","yyy");*/