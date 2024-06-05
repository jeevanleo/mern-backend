const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors"); // Import the cors middleware

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Add CORS middleware
app.use(cors());

io.on("connection", (socket) => {
  console.log("User Online");

  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });
});

const server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
server.listen(server_port, () => {
  console.log("Started on : " + server_port);
});
