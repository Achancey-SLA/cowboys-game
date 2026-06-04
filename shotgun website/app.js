const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Simple route
app.get('/', (req, res) => {
;  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle new messages
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    // Broadcast the message to all connected clients
      io.emit('chat message', msg);
    });

    socket.on('start', (msg) => {
  console.log('Start message received:', msg);
  // Broadcast the start message to all connected clients
    io.emit('start', msg);
  });
      socket.on('confirm', (msg) => {
  console.log('Confirm message received:', msg);
  // Broadcast the confirm message to all connected clients
    io.emit('confirm', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  socket.on('shoot', (msg) => {
    console.log('Shoot action received from:', msg);
    // Broadcast the shoot action to all connected clients
      io.emit('shoot', msg);
    });
    socket.on('load', (msg) => {
    console.log('Load action received from:', msg);
    // Broadcast the load action to all connected clients
      io.emit('load', msg);
    });
    socket.on('shield', (msg) => {
    console.log('Shield action received from:', msg);
    // Broadcast the shield action to all connected clients
      io.emit('shield', msg);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});