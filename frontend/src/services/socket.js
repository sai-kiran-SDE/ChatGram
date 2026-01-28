import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5050";

let socket;

export const connectSocket = (token) => {
  socket = io(SOCKET_URL);

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
    socket.emit("authenticate", token);
  });

  return socket;
};

export const getSocket = () => socket;
