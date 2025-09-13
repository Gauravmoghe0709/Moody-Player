import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({setAuth}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
		await axios.post("http://localhost:3000/user/login",{
			username,password
		},{withCredentials:true})
		setAuth(true)
		navigate("/")
	} catch (error) {
		console.log(error)		
	}
     
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="text-5xl mb-3">🎧</div>
          <h1 className="text-white text-2xl font-semibold">Moody Player</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-gray-400 text-sm text-center">Sign in to continue to your music.</p>

          <label className="flex flex-col gap-1 text-gray-300 text-sm">
            <span>Email</span>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="you@example.com"
              required
              className="p-2 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-gray-300 text-sm">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="p-2 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>


          <button className="mt-4 p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold hover:from-blue-700 hover:to-purple-800 transition-all" type="submit">Sign in</button>

          <div className="text-center text-gray-500 my-2">Don`t Have an Account</div>
            <button type="button" className="p-2 rounded-lg border border-gray-700 bg-gray-900 text-white hover:bg-gray-700 transition-colors" onClick={()=>{navigate("/Register")}}> Register Here</button>
        </form>
      </div>
    </div>
  );
};

export default Login;