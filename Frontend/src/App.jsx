import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import FaceRouter from './Router/FaceRouter'




function App() {
   
  const [songlist,setsonglist] = useState([{

  }])
  return (
    <>

    
    <FaceRouter></FaceRouter>
      
  
    </>
  )
}

export default App
