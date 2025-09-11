import { Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import axios from "axios";
import { useState, useEffect } from "react";
import Home from "../pages/Home";
import { Navigate } from "react-router-dom";


const FaceRouter = () => {
    const [Auth, setAuth] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:3000/user/profile",{withCredentials:true})
        .then(()=>{setAuth(true)})
        .catch(()=>{setAuth(false)})
    }, [])
    
    return (
        <>
            <Routes>
                <Route
                path="/login"
                 element={Auth?<Navigate to="/"></Navigate>:<Login setAuth={setAuth}></Login>}></Route>
                <Route 
                 path="/"
                 element={Auth?<Home></Home>:<Navigate to="/login"></Navigate>}
                ></Route>
            </Routes>
        </>

    )
}

export default FaceRouter
