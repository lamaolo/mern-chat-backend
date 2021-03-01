const socketIO = require("socket.io");
const socket = {};

function connect(server) {
  socket.io = socketIO(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });
}

module.exports = {
  connect,
  socket,
};
