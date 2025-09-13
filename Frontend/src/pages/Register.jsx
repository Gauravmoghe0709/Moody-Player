import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !username || !password) {
      setError("Please fill all fields.");
      return;
    }
    setError("");
    console.log("Register", { name, username });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <form className="w-full max-w-md bg-gray-800 p-7 rounded-xl shadow-2xl flex flex-col gap-4 text-gray-100"
        onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-white">Create account</h2>
        <p className="text-sm text-gray-400">Start listening and save your favorites.</p>


        <label className="flex flex-col gap-1 text-sm">
          <span>Full name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
            className="p-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span>Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            required
            className="p-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span>Create password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            required
            className="p-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <button className="mt-3 p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold cursor-pointer hover:from-blue-700 hover:to-purple-800 transition-all duration-200"
          type="submit">Register</button>
		  <div className="text-center text-gray-500 my-2">You Have Already Registered.?</div>
            <button type="button" className="p-2 rounded-lg border border-gray-700 bg-gray-900 text-white hover:bg-gray-700 transition-colors" onClick={()=>{navigate("/login")}}>Log-in</button>

      </form>
    </div>
  );
};

export default Register;
