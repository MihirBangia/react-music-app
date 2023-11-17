import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
// import AudioPlayer from "react-audio-player";
import "./player.css"; // Import your CSS file


const Player = ({queue}) => {
  let [songdata,setsongdata] = useState()
  let [currentsong,setcurrentsong] = useState(0)

  
  let myqueue={queue};

  useEffect(()=>{
    if(myqueue.queue[0].name!==songdata?.name){
      setcurrentsong(0)
    }
      setsongdata(myqueue.queue[currentsong])
  },[myqueue.queue,currentsong])


  if (songdata?.downloadUrl ) {
    const songname = songdata?.name.split("(")[0]
    return (
      <div className="music-player-container">
        <div className="music-player-content">
          <div className="music-info">
            <h3>{songname}</h3>
            <p>{songdata?.primaryArtists}</p>
          </div>
          <ReactAudioPlayer
            src={songdata?.downloadUrl[3].link} // Replace with your audio file URL
            controls={true}
            autoPlay
            onEnded={()=>{setTimeout(() => {
             setcurrentsong(currentsong+1)   
            }, 1500);}}
          />
        </div>
      </div>
    );
  } else return null;
};

export default Player;
