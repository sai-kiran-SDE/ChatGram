# ChatGram 💬  
A real-time one-to-one chat application built using the MERN stack with Socket.io.

## 🚀 Live Demo
- Frontend: https://chatgram.vercel.app  
- Backend: https://chatgram-9oo7.onrender.com  

## 📂 GitHub Repository
https://github.com/sai-kiran-SDE/ChatGram

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- Socket.io Client

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.io

### Deployment
- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

## ✨ Features

- User Signup & Login
- JWT-based Authentication
- Protected Routes
- One-to-One Real-Time Chat
- Real-Time Messaging using Socket.io
- Online / Offline User Status
- Message Timestamps
- Clear Chat Option
- Responsive UI (Mobile & Laptop)
- Clean Instagram-style Dark UI

---

## 🧠 System Overview

1. Users authenticate using JWT.
2. Protected APIs allow only logged-in users.
3. Socket.io enables real-time communication.
4. Messages are stored in MongoDB.
5. Online users are tracked using socket connections.
6. Frontend updates instantly without page refresh.

---

## 📁 Project Structure

ChatGram/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── socket/
│ ├── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── main.jsx
│
└── README.md


---

## 🧪 Run Locally

### 1️⃣ Clone Repository
```bash
git clone https://github.com/sai-kiran-SDE/ChatGram.git
cd ChatGram


cd backend
npm install
npm run dev

PORT=5050
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

cd frontend
npm install
npm run dev
