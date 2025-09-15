import { Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import axios from "axios";
import { useState, useEffect } from "react";
import Home from "../pages/Home";
import Register from "../pages/Register"
import { Navigate } from "react-router-dom";
import  Search  from "../pages/Search";


const FaceRouter = () => {
    const [Auth, setAuth] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:3000/user/profile", { withCredentials: true })
            .then(() => { setAuth(true) })
            .catch(() => { setAuth(false) })
    }, [])

    return (
        <>
            <Routes>
                <Route
                    path="/login"
                    element={Auth ? <Navigate to="/"></Navigate> : <Login setAuth={setAuth}></Login>}></Route>
                <Route
                    path="/"
                    element={Auth ? <Home setAuth={setAuth} ></Home> : <Navigate to="/login"></Navigate>}
                ></Route>
                <Route path="/Register" element={<Register></Register>}></Route>
                <Route path="/Search" element={<Search></Search>}></Route>

            </Routes>
        </>

    )
}

export default FaceRouter
