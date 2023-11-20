import React, {useState } from "react";
import "../Card/card.css";
import Player from "../player/player";
import DeleteIcon from '@mui/icons-material/Delete';

export default function ListingPlaylist(props) {
  let songs = props.songsinarray;
  const [currentsong, setcurrentsong] = useState(null);
  const [queue,setqueue] = useState([]);
  
  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  return (
    <>
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
          <div id="boxes" key={index}>
          <div id="player02" className="player horizontal">
          <DeleteIcon sx={{ color: 'white', position: 'absolute', right: '15px', top: '15px' }}onClick={()=>props.deletefromplaylist(item)} />
            <div className="wrapper" onClick={() => {
              setcurrentsong(item);
              setqueue(songs.slice(index));
            }}>
              <div className="info-wrapper">
                <img src={item.image[1].link} alt="LogoMusicImage" className="player-image" />
                <div className="info">
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
          <Player queue={queue} />
        </div>
      )}
    </>
  );
}
