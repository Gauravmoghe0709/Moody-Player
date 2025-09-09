import { Routes, Route } from "react-router-dom"
import Register from "../pages/Register"
import Login from "../pages/Login"

const FaceRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/Register" element={<Register></Register>}></Route>
            </Routes>
        </>

    )
}

export default FaceRouter
