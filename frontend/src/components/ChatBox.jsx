import { useEffect, useState, useRef } from "react";
import {
  fetchMessages,
  sendMessageApi,
  clearMessagesApi,
} from "../services/api";
import Message from "./Message";
import { getSocket } from "../services/socket";
import { useChat } from "../context/ChatContext";

const ChatBox = () => {
  const { selectedUser, messages, setMessages } = useChat();
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const loggedInUserId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;

  // Clear chat handler
  const handleClearChat = async () => {
    if (!selectedUser) return;

    const confirmClear = window.confirm("Clear all messages?");
    if (!confirmClear) return;

    try {
      await clearMessagesApi(selectedUser._id);
      setMessages([]);
    } catch (err) {
      alert("Failed to clear messages");
    }
  };

  // Fetch messages when user changes
  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser._id).then((res) => {
        setMessages(res.data);
      });
    }
  }, [selectedUser, setMessages]);

  // Listen for incoming messages
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("receiveMessage", (message) => {
      if (message.senderId === selectedUser?._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedUser, setMessages]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !selectedUser) return;

    const res = await sendMessageApi({
      receiverId: selectedUser._id,
      text,
    });

    const socket = getSocket();
    socket.emit("sendMessage", {
      receiverId: selectedUser._id,
      text,
    });

    setMessages((prev) => [...prev, res.data]);
    setText("");
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-neutral-500 bg-black">
        Select a conversation
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-black text-white h-full">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800 shrink-0 flex justify-between items-center">
        <span className="font-semibold">{selectedUser.name}</span>

        <button
          onClick={handleClearChat}
          className="text-xs text-red-400 hover:text-red-500"
        >
          Clear
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4">
  <div className="flex flex-col gap-2 py-4">
    {messages.map((msg, index) => (
      <Message
        key={index}
        message={msg}
        isOwn={msg.sender === loggedInUserId}
      />
    ))}
    <div ref={messagesEndRef} />
  </div>
</div>


      {/* Input */}
      <div className="p-4 border-t border-neutral-800 shrink-0 flex items-center gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 bg-neutral-900 rounded-full px-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none"
          placeholder="Message..."
        />

        <button
          onClick={handleSend}
          className="text-[#0095f6] font-semibold text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
