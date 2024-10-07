const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const server = http.createServer(app);
const allowedOrigins = ["https://chat-app-client-navy.vercel.app"];

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: "*",
    // origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data.roomNumber);
  });

  socket.on("send_message", (data) => {
    console.log(data, "daada");

    socket.to(data.room).emit("receive_message", data);
    // socket.broadcast.emit("receive_message", data.message);
    // console.log(data,"msg");
  });
});

//deploy code
const dirPath = path.resolve();
app.use(express.static("./Frontend/dist"));
app.get("*", (req,res)=>{
  res.sendFile(path.resolve(dirPath, './Frontend/dist', 'index.html'));
});


server.listen(3001, () => {
  console.log("SERVER IS RUNNING...");
});
