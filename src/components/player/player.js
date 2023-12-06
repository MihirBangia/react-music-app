import React, { useEffect, useState } from "react";
// import ReactAudioPlayer from "react-audio-player";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import AudioPlayer from "react-audio-player";
import "./player.css"; // Import your CSS file
import CloseIcon from '@mui/icons-material/Close';


const Player = ({queue}) => {
  let [songdata,setsongdata] = useState()
  let [currentsong,setcurrentsong] = useState(0)

  
  let myqueue={queue};

  useEffect(()=>{
    if(myqueue.queue.indexOf(songdata)===-1){
      setcurrentsong(0)
    }
      setsongdata(myqueue.queue[currentsong])
  },[myqueue.queue,currentsong])


  if (songdata?.downloadUrl ) {
    const songname = songdata?.name.split("(")[0]
    return (
      <>
      <div className="music-player-container">
      {/* <CloseIcon sx={{color:"white",position:'absolute',right:'25px',cursor:'pointer'}}/> */}
        <div className="music-player-content">
          <div className="music-info">
            <h3>{songname}</h3>
            <p>{songdata?.primaryArtists}</p>
          </div>
          <AudioPlayer
            src={songdata?.downloadUrl[4].link} // Replace with your audio file URL
            controls={true}
            showSkipControls={true}
            showJumpControls={false}
            customVolumeControls={[]}
            autoPlay
            onEnded={()=>{setTimeout(() => {
             setcurrentsong(currentsong+1)   
            }, 1500);}}
            onClickNext={()=>{
              setcurrentsong(currentsong+1)
            }}
            onClickPrevious={()=>{
              setcurrentsong(currentsong-1)
            }}
          />
        </div>
      </div>
      </>
    );
  } else return null;
};

export default Player;
