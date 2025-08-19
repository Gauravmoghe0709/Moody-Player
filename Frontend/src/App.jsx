import { useState } from 'react'
import './App.css'
import FaceExpressionDetector from './component/FaceExpressionDetector'
import Songs from './component/Songs'


function App() {
   
  const [songlist,setsonglist] = useState([{

  }])
  return (
    <>
      <FaceExpressionDetector setsonglist={setsonglist}></FaceExpressionDetector>
      <Songs songlist={songlist}></Songs>
  
    </>
  )
}

export default App
