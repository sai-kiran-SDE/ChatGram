import axios from "axios";

const API = axios.create({
  baseURL: "https://chatgram-9oo7.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const fetchUsers = () => API.get("/users");
export const fetchMessages = (userId) => API.get(`/messages/${userId}`);
export const sendMessageApi = (data) => API.post("/messages", data);
export const clearMessagesApi = (userId) => {
  return API.delete(`/messages/clear/${userId}`);
};


export default API;
