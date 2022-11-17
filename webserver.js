const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + "/app/"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/app/index.html");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

const Gpio = require("onoff").Gpio;

// connect + from dial to any power pin e.g. pin number 01
// connect grd from dial to any ground pin e.g. pin number 06
// connect sw from dial to gpio 4
const button = new Gpio(4, "in", "rising");

// https://thepihut.com/blogs/raspberry-pi-tutorials/how-to-use-a-rotary-encoder-with-the-raspberry-pi
// attach CLK to pin GPIO 17
// DT to GPIO 18
const nodaryEncoder = require("nodary-encoder");
const myEncoder = nodaryEncoder(18, 17);

let prevValue = null;

// button event
button.watch((err, value) => io.emit("isReflected", { value: value }));

// turn event
myEncoder.on("rotation", (direction, value) => {
  if (value !== prevValue) {
    io.emit("sliceSizeChange", { value: direction });
    prevValue = value;
  }
});
