const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://192.168.1.165:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // socket.on('create_room', (data) => {
  //   socket.join(data);
  //   console.log(data);
  // });

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(data);
  });

  // socket.on('paired', (data) => {
  //   console.log(data);
  // });

  socket.on('send_message', (data) => {
    console.log(data);
    socket.to(data.room).emit('received_message', data);
    // socket.emit('received_message', data);
  });

  socket.on('start_clock', (data) => {
    // console.log(data);
    socket.to(data.room).emit('clock', data);
  });

  socket.on('stop_clock', (data) => {
    // console.log(data);
    socket.broadcast.emit('clock', data);
  });

  socket.on('set_time', (data) => {
    console.log(data);
    socket.to(data.room).emit('time', data);
  });
});

server.listen(3001, () => {
  console.log('Server is running on 3001');
});
