

const Songs = ({songlist}) => {
  
 
   
  return (
    <>
    <div className="mood-songs">
      <h2>{`Recommended songs:`}</h2>
      
        
      {songlist && songlist.length > 0 ? (
        songlist.map((song, idx) => (
          
          <div key={idx} className="mood">
            
            <h1>{song.songname}</h1>
            <div>
             {(song.Audio)?(<audio src={song.Audio} controls></audio>):""} 
            </div>
          </div>
          
          
          
        ))
      ) : (
        <p>No songs available</p>
      )}
      </div>   
    </>
  )
}

export default Songs
