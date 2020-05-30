const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New WebSocket Connection");

  socket.emit("sendMessage", "Welcome!");
  socket.broadcast.emit("sendMessage", "A new user has joined:)");

  socket.on("sendMessage", (message) => {
    io.emit("sendMessage", message);
  });

  socket.on("disconnect", () => {
    io.emit("sendMessage", "A user has left");
  });

  socket.on("sendLocation", ({ latitude, longitude }) => {
    io.emit(
      "sendMessage",
      `https://www.google.com/maps?q=${latitude},${longitude}`
    );
  });
});

server.listen(port, () => console.log(`Server is up on port ${port}`));
