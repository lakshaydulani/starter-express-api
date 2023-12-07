const express = require("express");
const WebSocket = require("ws");

const app = express();
const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

const fs = require("fs");
const util = require("util");
var log_file = fs.createWriteStream(__dirname + "/debug.log", { flags: "w" });

console.log = function (d) {
  const timestamp = new Date().toUTCString();
  log_file.write(timestamp + " >>> " + util.format(d) + "\n");
};

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("A new WebSocket connection has been established");

  // Handle incoming messages from the client
  ws.on("message", (messagebuffer) => {
    // Convert the buffer array message to a string
    const message = messagebuffer.toString();
    console.log("Received message (string):", message);

    if (message.body?.results[0]?.final === true) {
      const msg = message.body.results[0].alternatives[0].transcript;
      if (msg.toLowerCase().includes("hello hello hello")) {
        ws.send({
          category: "scene",
          kind: "request",
          name: "startSpeaking",
          transaction: null,
          body: {
            personaId: 1,
            text: "Yes, I can help you.",
          },
        });
      }
    }
  });

  // Handle WebSocket disconnections
  ws.on("close", () => {
    console.log("WebSocket connection has been closed");
  });
});

// Define your API routes
app.get("/", (req, res) => {
  res.send("");
});
