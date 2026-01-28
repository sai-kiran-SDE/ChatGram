import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-3 bg-neutral-800 rounded text-white placeholder-gray-400 focus:outline-none"
        />

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
          Sign up
        </button>

        <p className="text-center text-sm mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0095f6]">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
