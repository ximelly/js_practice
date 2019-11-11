const http=require("http");
const io=require("socket.io");

let server=http.createServer(()=>{

})
server.listen(8080);
let wx=io.listen(server);

let txt="",
    sockets=[];//所有链接的socket集合

wx.on("connection",socket=>{
    console.log("链接上了");
    sockets.push(socket);//每次连接上都往sockets里面添加
    socket.emit("change",txt);//有新用户中途加进来的话初始化数据
    socket.on("disconnection",socket=>{
        sockets=sockets.filter(socket=>socket);
    });
    socket.on("data",data=>{
        txt=data;
        sockets.forEach(socket=>{
            socket.emit("change",txt);
        })
    });
})


/*发送信息
    xxx为事件名称
    socket.on("xxx",data=>{
        console.log(data);
    });

接收信息    
    socket.emit("xxx","yyy");*/