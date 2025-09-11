import { useState } from "react"
import FaceExpressionDetector from "../pages/FaceExpressionDetector"
import Songs from "../pages/Songs"
import "../pages/FaceExpression.css"


const Home = () => {
    const [songlist, setsonglist] = useState([{

    }])
    return (
        <>
            <FaceExpressionDetector setsonglist={setsonglist}></FaceExpressionDetector>
            <Songs songlist={songlist}></Songs>
            

        </>
    )
}

export default Home
