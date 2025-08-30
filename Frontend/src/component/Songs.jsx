
import React, { useRef } from "react";

const Songs = ({ songlist }) => {
  const audioRefs = useRef([]);
  const currentAudio = useRef(null);

  const handlePlay = (idx) => {
    if (currentAudio.current && currentAudio.current !== audioRefs.current[idx]) {
      currentAudio.current.pause();
      currentAudio.current.currentTime = 0;
    }
    currentAudio.current = audioRefs.current[idx];
  };

  return (
    <>
      <div className="mood-songs">
        <h2>{`Recommended songs:`}</h2>
        {songlist && songlist.length > 0 ? (
          songlist.map((song, idx) => (
            <div key={idx} className="mood">
              <h1>{song.songname}</h1>
              <div>
                {song.Audio ? (
                  <audio
                    src={song.Audio}
                    controls
                    ref={el => (audioRefs.current[idx] = el)}
                    onPlay={() => handlePlay(idx)}
                  ></audio>
                ) : (
                  ""
                )}
              </div> 
            </div>
          ))
        ) : (
          <p>No songs available</p>
        )}
      </div>
    </>
  );
};

export default Songs;
