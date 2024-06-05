const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "https://whiteboardjs.netlify.app/", // Allow requests from this origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "https://whiteboardjs.netlify.app/", // Allow requests from this origin
    methods: ["GET", "POST"],
    credentials: true,
  })
);

io.on("connection", (socket) => {
  console.log("User Online");

  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });

  socket.on("clear-canvas", () => {
    socket.broadcast.emit("clear-canvas");
  });
});

const server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
server.listen(server_port, () => {
  console.log("Started on : " + server_port);
});
