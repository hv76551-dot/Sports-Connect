const socketIo = require('socket.io');

let io;

const initSocket = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A client connected');
    // You can add more socket event handlers here if needed
  });
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = {
  initSocket,
  getIo,
};
