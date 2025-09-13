import { useState } from "react"
import FaceExpressionDetector from "../pages/FaceExpressionDetector"
import Songs from "../pages/Songs"
import { Menu, X } from "lucide-react";
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"

const Home = ({ setAuth }) => {
    const navigate = useNavigate()
    const [songlist, setsonglist] = useState([{

    }])
    const [isOpen, setIsOpen] = useState(true);

    async function handlelogout() {
        try {
            const res = await axios.post("http://localhost:3000/user/logout", {}, { withCredentials: true })
            console.log(res.data)
            setAuth(false)
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="flex  bg-gray-900 text-white">
                {isOpen && (
                    <div className="w-64 h-screen bg-gray-800 p-5 fixed md:static flex flex-col gap-5">
                        <h2 className="text-2xl font-bold mb-6">My Sidebar</h2>
                        <NavLink to="/">Home</NavLink>
                         <NavLink to="/Login" onClick={handlelogout}>Logout</NavLink>
                        
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

            <div className="">
                <FaceExpressionDetector setsonglist={setsonglist} setAuth={setAuth}></FaceExpressionDetector>
                <Songs songlist={songlist}></Songs>
            </div>

        </>
    )
}

export default Home