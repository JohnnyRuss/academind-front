import { io } from 'socket.io-client';

function establishConnection() {
  return io('http://localhost:4000');
}

export const socket = establishConnection();
