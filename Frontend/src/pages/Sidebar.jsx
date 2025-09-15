
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from "lucide-react";
import {  useNavigate } from "react-router-dom"
import axios from 'axios';


const Sidebar = () => {
      const [isOpen, setIsOpen] = useState(true);
       const navigate = useNavigate()

       async function handlelogout() {
              try {
                  const res = await axios.post("http://localhost:3000/user/logout", {}, { withCredentials: true })
                  console.log(res)
                  setAuth(false)
                  navigate("/login")
              } catch (error) {
                  console.log(error)
              }
          }
  return (
    <div>
       <div className="flex bg-gray-900 text-white">
                    {isOpen && (
                        <div className="w-64 h-screen bg-gray-800 p-5 fixed md:static flex flex-col gap-5">
                            <h2 className="text-2xl font-bold mb-6">Moody Player</h2>
                            <NavLink to="/">Home</NavLink>
    
                             <NavLink to="/Login" onClick={handlelogout}>Logout</NavLink>
                             <NavLink to="/Search">search</NavLink>
                            
                        </div>
                    )}
    
                    <div
                        className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"
                            }`}
                    >
                        <button
                            className="p-2 m-2 bg-gray-800 text-white rounded"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
    </div>
    </div>
  )
}

export default Sidebar
 