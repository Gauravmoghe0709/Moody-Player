import { useRef } from "react";

const Songs = ({ songlist }) => {
  const audioRefs = useRef([]);

  const handlePlay = (idx) => {
    // Pause all audios except the one clicked
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== idx) {
        audio.pause();
        audio.currentTime = 0; // reset
      }
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-4">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-4">
        🎵 Recommended Songs
      </h2>

      {songlist && songlist.length > 0 ? (
        <div className="flex flex-col gap-4">
          {songlist.map((song, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center justify-between p-3 rounded-lg border border-gray-700 shadow-sm bg-gray-800 text-white"
            >
              <h1 className="text-lg font-medium">{song.songname}</h1>
              <div className="mt-2 md:mt-0 md:ml-4 flex-1 flex justify-end">
                {song.Audio ? (
                  <audio
                    src={song.Audio}
                    controls
                    ref={(el) => (audioRefs.current[idx] = el)}
                    onPlay={() => handlePlay(idx)}
                  />
                ) : (
                  <span className="text-red-400">No audio available</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-4">No songs available</p>
      )}
    </div>
  );
};

export default Songs;
