
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from "lucide-react";
import {  useNavigate } from "react-router-dom"
import axios from 'axios';


const Sidebar = ({ setAuth }) => {

   
                        const [isOpen, setIsOpen] = useState(true);
                        useEffect(() => {
                                try {
                                    setIsOpen(window.innerWidth >= 768);
                                } catch (e) {
                                    setIsOpen(true);
                                }
                        }, []);
                        useEffect(() => {
                            const onKey = (e) => {
                                if (e.key === 'Escape') setIsOpen(false);
                            };
                            window.addEventListener('keydown', onKey);
                            return () => window.removeEventListener('keydown', onKey);
                        }, []);
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
                                
                                <div className="relative">
                                    {/* overlay for small screens when sidebar is open */}
                                    <div
                                        className={`fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                                        onClick={() => setIsOpen(false)}
                                        aria-hidden={!isOpen}
                                    />

                                    <aside
                                        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 p-5 z-40 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
                                        aria-hidden={!isOpen && window.innerWidth < 768}
                                    >
                                        <h2 className="text-2xl font-bold mb-6">Moody Player</h2>
                                        <nav className="flex flex-col gap-3">
                                            <NavLink to="/" className={({isActive}) => `px-2 py-1 rounded ${isActive ? 'bg-slate-700' : 'hover:bg-slate-700'}`}>Home</NavLink>
                                            <NavLink to="/Search" className={({isActive}) => `px-2 py-1 rounded ${isActive ? 'bg-slate-700' : 'hover:bg-slate-700'}`}>Search</NavLink>
                                            <button onClick={handlelogout} className="text-left px-2 py-1 rounded hover:bg-slate-700">Logout</button>
                                        </nav>
                                    </aside>
                                </div>

                                <div className={`flex-1 transition-all duration-300 ${isOpen ? 'md:ml-64' : 'md:ml-0'}`}>
                                    <div className="p-2 flex items-center">
                                        <button
                                            aria-label="Toggle sidebar"
                                            className="p-2 m-2 bg-gray-800 text-white rounded md:hidden"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            {isOpen ? <X /> : <Menu />}
                                        </button>

                                        <button
                                            aria-label="Toggle sidebar"
                                            className="p-2 m-2 bg-gray-800 text-white rounded hidden md:inline-block"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            {isOpen ? <X /> : <Menu />}
                                        </button>
                                    </div>
                                </div>
            </div>
        </div>
    );
}

export default Sidebar
 