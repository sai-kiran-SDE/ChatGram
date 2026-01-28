import { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";

const UserList = ({ selectedUser, onSelectUser, onlineUsers }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="w-full md:w-1/4 bg-black border-r border-neutral-800 h-full overflow-y-auto">

      {/* Header */}
      <h2 className="p-4 text-lg font-semibold border-b border-neutral-800">
        Messages
      </h2>

      {/* Users */}
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => onSelectUser(user)}
          className={`px-4 py-3 cursor-pointer flex justify-between items-center transition
            ${
              selectedUser?._id === user._id
                ? "bg-neutral-900"
                : "hover:bg-neutral-900"
            }`}
        >
          {/* Username */}
          <span className="text-sm font-medium text-white">
            {user.name}
          </span>

          {/* Online indicator */}
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              onlineUsers.includes(user._id)
                ? "bg-green-500"
                : "bg-neutral-600"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default UserList;
