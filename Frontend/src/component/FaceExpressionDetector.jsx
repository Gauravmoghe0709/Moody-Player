import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import "../component/faceExpression.css"
import axios from "axios";
export default function FaceExpressionDetector( {setsonglist} ) {
  const videoRef = useRef();
  const [expression, setExpression] = useState("");

   const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => (videoRef.current.srcObject = stream))
      .catch((err) => console.error(err));
  };

  async function handleVideoPlay() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();



    if (detections.length > 0) {
      const topExpression = Object.entries(detections[0].expressions)
        .sort((a, b) => b[1] - a[1])[0][0];
      setExpression(topExpression);
    }
    if (!detections || detections.length === 0) {
      console.log("no face")
      return
    }
    axios.get(`http://localhost:3000/song?mood=${expression}`)
    .then(res=>{
      console.log(res.data)
      setsonglist(res.data.songs)
    })
    


    
  };


  useEffect(() => {

    loadModels().then(startVideo);
  }, []);


  return (
    <div className="mood-player">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="video-feed"
      />
      <button onClick={handleVideoPlay} className="video-btn">Detect Mood</button>

    </div>
  );
}
