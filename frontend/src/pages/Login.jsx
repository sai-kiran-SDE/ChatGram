import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 p-8 rounded-xl w-full max-w-sm border border-neutral-800"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-white tracking-wide">
  ChatGram
</h2>


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 bg-neutral-800 rounded text-white placeholder-gray-400 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-neutral-800 rounded text-white placeholder-gray-400 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-[#0095f6] py-2 rounded font-semibold"
        >
          Log in
        </button>

        <p className="text-center text-sm mt-4 text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#0095f6]">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
