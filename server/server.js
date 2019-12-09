const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname,'/../public');
var app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.get('/', function(req, res){
    res.sendFile(publicPath + '/index.html');
  });

io.on("connection",(socket)=>{
    console.log("A new user just connected");

    
    socket.on("transfare",(data)=>{
        console.log("from:"+data.from +"\nto:"+data.to +"\namount:"+data.amount +"\nnote:"+data.note);
        
        socket.emit("feedback",{status:400,message:"done"})
    })


    socket.on("disconnect",()=>{
        console.log("User was disconnected");
    })
})


server.listen(port,()=>{
    console.log(`Server is up and running on port:${port}`);
})