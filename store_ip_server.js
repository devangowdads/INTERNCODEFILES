const http = require("http");
iptable = [];

const requestListener1 = function (req, res) {
  if (iptable.includes(req.socket.remoteAddress.split("ffff:").toString())==false) {
    iptable.push(req.socket.remoteAddress.split("ffff:").toString());
    console.log(req.socket.remoteAddress.split("ffff:").toString() +" node added");
  }
  res.end(req.socket.remoteAddress.split("ffff:").toString());
  //console.log(req.socket.remoteAddress.split("ffff:"));
  //console.log(iptable )
};

const server1 = http.createServer(requestListener1);
const PORT1 = 2006
server1.listen(PORT1,'192.168.225.193', () => {
  console.log(`Server to add ip is running on 2006`);
});

const requestListener2 = function (req, res) {
  res.end(`[${iptable.toString()}]`);
};

const server2 = http.createServer(requestListener2);
const PORT2 = 2007
server2.listen(PORT2,'192.168.225.193', () => {
  console.log(`Server for iptable entries on port 2007`);
});

////////

const app = require('express')();
const http1 = require('http').Server(app);
const io = require('socket.io')(http1);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
});


app.get('/send', (req, res) => {
  res.sendFile(__dirname +'/sender_side/');
});

app.get('/recive', (req, res) => {
  res.sendFile(__dirname +'/reciver_side/');
});

app.get('/chat', (req, res) => {
  res.sendFile(__dirname +'/chat.html');
});

app.get('/sendto', (req, res) => {
  res.sendFile(__dirname +'/sender_side/sender_interface.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('bind', msg => {
    io.emit('bind', msg);
  });


});

http1.listen(port,"192.168.225.193" ,() => {
  console.log(`Socket.IO server running at http://192.168.225.193:${port}/`);
});

//////


const express2 = require("express");
const path2 = require("path");

const app2 = express2();
const server3 = require("http").createServer(app2);
const io2 = require("socket.io")(server3);
app2.use(express2.static (path2.join(__dirname + '/public')));


io2.on("connection", function(socket) {
  socket.on("sender-join",function(data){
    socket.join(data.uid);
    socket.in(data.uid).emit("",data.uid)
    console.log(data.uid);
  });
  socket.on("receiver-join", function(data){
    socket.join(data.uid);
    console.log(data.uid);
    socket.in(data.uid).emit("",data.uid)
    socket.in(data.sender_uid).emit("init",data.uid);
  });
  socket.on("file-meta",function(data){
    socket.in(data.uid).emit("fs-meta",data.metadata);
  });
  socket.on("fs-start",function(data){
    socket.in(data.uid).emit("fs-share",{});
  });
  socket.on("file-raw",function(data){
    socket.in(data.uid).emit("fs-share",data.buffer);
  });
});


server3.listen(5000);



