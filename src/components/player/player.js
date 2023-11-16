import React, { useContext, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
// import AudioPlayer from "react-audio-player";
import "./player.css"; // Import your CSS file
import { SongContext } from "../../App";

const Player = (props) => {
  let [Queue,setQueue] = useState(props.queue)
  let [currentsong,setcurrentsong] = useState(0)
  


  const song = useContext(SongContext);
  if (song?.downloadUrl ) {
    const songname = song?.name.split("(")[0]
    return (
      <div className="music-player-container">
        <div className="music-player-content">
          <div className="music-info">
            <h3>{songname}</h3>
            <p>{song?.primaryArtists}</p>
          </div>
          <ReactAudioPlayer
            src={Queue[currentsong].downloadUrl[3].link} // Replace with your audio file URL
            controls={true}
            autoPlay
            onEnded={()=>setTimeout(() => {
              if(currentsong!=Queue.length){
                setcurrentsong(currentsong+1)
              }
            }
            ,1000)}
          />
        </div>
      </div>
    );
  } else return null;
};

export default Player;
