import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default function FaceExpressionDetector({ setsonglist, onLogout }) {
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
      console.log("no face");
      return;
    }

    axios
      .get(`http://localhost:3000/song?mood=${expression}`)
      .then((res) => {
        console.log(res.data);
        setsonglist(res.data.songs);
      });
  }

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top bar with Logout */}
      <div className="w-full flex justify-between items-center p-4 bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold text-blue-400">Mood Player</h1>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col md:flex-row flex-1 items-center justify-center p-6 gap-6">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full md:w-2/4 max-w-2xl rounded-xl shadow-lg"
        />
        <div className="flex flex-col items-center md:items-start gap-4">
          <button
            onClick={handleVideoPlay}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg text-lg font-semibold transition"
          >
            Detect Mood
          </button>
        </div>
      </div>
    </div>
  );
}
