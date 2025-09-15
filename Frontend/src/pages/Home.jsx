import { useState } from "react"
import FaceExpressionDetector from "../pages/FaceExpressionDetector"
import Songs from "../pages/Songs"

import Sidebar from "../pages/Sidebar"

const Home = ({ setAuth }) => {
   
    const [songlist, setsonglist] = useState([{

    }])
  
    return (
        <>
         <Sidebar></Sidebar>
            <div>
                <FaceExpressionDetector setsonglist={setsonglist} setAuth={setAuth}></FaceExpressionDetector>
                <Songs songlist={songlist}></Songs>
            </div>

        </>
    )
}

export default Home