import { io } from "socket.io-client";

const SOCKET_URL = "https://chatgram-9oo7.onrender.com";

let socket;

export const connectSocket = (token) => {
  if (socket) return socket; // prevent multiple connections

  socket = io(SOCKET_URL, {
    auth: {
      token,
    },
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
  });

  return socket;
};

export const getSocket = () => socket;
