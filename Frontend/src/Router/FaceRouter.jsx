import { Routes, Route } from "react-router-dom"
import Login from "../component/Login"

const FaceRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/Login" element={<Login></Login>}></Route>
            </Routes>
        </>

    )
}

export default FaceRouter
