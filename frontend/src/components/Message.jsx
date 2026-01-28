const Message = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
          isOwn
            ? "bg-[#0095f6] text-white"
            : "bg-neutral-800 text-white"
        }`}
      >
        <p>{message.text}</p>

        <span className="block text-[10px] mt-1 opacity-60 text-right">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default Message;
