const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (message) => {
    console.log("Received message:", message);
    // Store the message or process it as needed

    // Broadcast the message to all connected clients
    io.emit("message", message);
  });

  socket.on("activeUser", (message) => {
    console.log("activeUser", message);
    // Store the message or process it as needed

    // Broadcast the message to all connected clients
    io.emit("activeUser", message);
  });

  socket.on("inactiveUser", (message) => {
    console.log("inactiveUser", message);
    // Store the message or process it as needed

    // Broadcast the message to all connected clients
    io.emit("inactiveUser", message);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
