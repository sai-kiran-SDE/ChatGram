import jwt from "jsonwebtoken";

const onlineUsers = new Map(); 
// userId => socketId

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("New socket connected:", socket.id);

    // AUTHENTICATE SOCKET
    socket.on("authenticate", (token) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        onlineUsers.set(userId, socket.id);
        socket.userId = userId;

        // notify all users
        io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      } catch (error) {
        console.log("Socket auth failed");
      }
    });

    // SEND MESSAGE REAL-TIME
    socket.on("sendMessage", ({ receiverId, text }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", {
          senderId: socket.userId,
          text,
          createdAt: new Date()
        });
      }
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      if (socket.userId) {
        onlineUsers.delete(socket.userId);
        io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      }
      console.log("Socket disconnected:", socket.id);
    });
  });
};

export default socketHandler;
