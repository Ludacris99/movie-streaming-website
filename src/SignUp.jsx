import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Account created successfully!");
      navigate("/login");
    } else {
      alert(data.error || "Signup failed");
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;