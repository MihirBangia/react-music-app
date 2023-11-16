import React, {useState } from "react";
import "./card.css";
import Player from "../player/player";
import { SongContext } from "../../App";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Card(props) {
  let songs = props.songs;
  const [currentsong, setcurrentsong] = useState(null);
  const [queue,setqueue] = useState([]);
  
  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }


  return (
    <>
      <SongContext.Provider value={currentsong}>
        <Player />
      </SongContext.Provider>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          zIndex: "1",
        }}
      >
        {songs?.map((item, index) => (
          <div id="boxes">
          <div id="player02" class="player horizontal">
            <FavoriteBorderIcon sx={{ color: 'white', position: 'absolute', right: '15px', top: '15px' }} />
            <div class="wrapper" onClick={() => {
              setcurrentsong(item);
              setqueue(songs.slice(index));
            }}>
              <div class="info-wrapper">
                <img src={item.image[1].link} alt="LogoMusicImage" class="player-image" />
                <div class="info">
                  <h1>{truncate(item.name, 10)}</h1>
                  <p>{truncate(item.primaryArtists, 10)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
      {currentsong && (
        <div style={{ marginTop: "160px" }}>
          <Player queue={[queue]} />
        </div>
      )}
    </>
  );
}
