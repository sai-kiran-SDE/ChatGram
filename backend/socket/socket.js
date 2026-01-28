import jwt from "jsonwebtoken";

const onlineUsers = new Map();

const socketHandler = (io) => {
  // 🔐 SOCKET AUTH MIDDLEWARE
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("No token"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    onlineUsers.set(socket.userId, socket.id);

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));

    // SEND MESSAGE
    socket.on("sendMessage", ({ receiverId, text }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", {
          senderId: socket.userId,
          text,
          createdAt: new Date(),
        });
      }
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      onlineUsers.delete(socket.userId);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      console.log("Socket disconnected:", socket.id);
    });
  });
};

export default socketHandler;
