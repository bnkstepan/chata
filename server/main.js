import { Server } from "socket.io";

const io = new Server(3000, { cors: { origin: '*' } });


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat_message', (msg) => {
    console.log('message: ' + JSON.stringify(msg));
    socket.broadcast.to(msg.whichroom).emit('chat_message', msg);
  });

  socket.on('room_message', (rmsg) => {
    socket.join(rmsg);
  });
});

