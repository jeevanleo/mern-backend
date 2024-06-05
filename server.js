const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("User Online");

  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });
});

const serverPort = process.env.YOUR_PORT || process.env.PORT || 5000;
server.listen(serverPort, () => {
  console.log(`Server started on port: ${serverPort}`);
});
