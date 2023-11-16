import React, { useContext } from "react";
import ReactAudioPlayer from "react-audio-player";
// import AudioPlayer from "react-audio-player";
import "./player.css"; // Import your CSS file
import { SongContext } from "../../App";

const Player = () => {
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
            src={song?.downloadUrl[3].link} // Replace with your audio file URL
            controls={true}
            autoPlay
          />
        </div>
      </div>
    );
  } else return null;
};

export default Player;
