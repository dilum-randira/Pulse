import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = (token) => {
  if (!token) {
    return null;
  }

  if (socket?.connected) {
    return socket;
  }

  if (!socket) {
    socket = io('http://localhost:5000', {
      autoConnect: false,
      auth: {
        token,
      },
    });
  }

  socket.auth = { token };
  socket.connect();
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};