import { useEffect } from "react";
import { fetchUsers } from "../services/api";
import UserList from "../components/UserList";
import ChatBox from "../components/ChatBox";
import { connectSocket } from "../services/socket";
import { useChat } from "../context/ChatContext";

const Dashboard = () => {
  const {
    selectedUser,
    setSelectedUser,
    onlineUsers,
    setOnlineUsers,
  } = useChat();

  useEffect(() => {
    fetchUsers().then(() => {
      // users loaded in UserList
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = connectSocket(token);

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [setOnlineUsers]);

  return (
    <div className="h-screen flex bg-black text-white overflow-hidden">

      <UserList
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
        onlineUsers={onlineUsers}
      />
      <ChatBox />
    </div>
  );
};

export default Dashboard;
