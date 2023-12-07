
const express = require('express');
const WebSocket = require('ws');

const app = express();
const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('A new WebSocket connection has been established');

  // Handle incoming messages from the client
  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Send a response back to the client
    ws.send('Server received your message');
  });

  // Handle WebSocket disconnections
  ws.on('close', () => {
    console.log('WebSocket connection has been closed');
  });
});

// Define your API routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
