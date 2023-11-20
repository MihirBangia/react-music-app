import React, { useState } from "react";
import "./card.css";
import Player from "../player/player";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Card(props) {
  let songs = props.songs;
  const [currentsong, setcurrentsong] = useState(null);
  const [queue, setqueue] = useState([]);
  let playlist = localStorage.getItem("playlist");
  let songsinarray = JSON.parse(playlist);
  let[icon,seticon] = useState(false)
  
  const list = songsinarray ? songsinarray : [];

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  const notify = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",  
    });
  };

  function setplaylist(song) {
    // let itemAvailble;
    // for (let i = 0; i < list.length; i++) {
    //   if (list[i].id === song.id) {
    //     itemAvailble = true;
    //     break;
    //   } else {
    //     itemAvailble = false;
    //   }
    // }
    // if (!itemAvailble) {
      list.push(song);
      notify("Added to Playlist");
    // } else {
      // notify("Song Already avalible in Playlist");
    // }
    localStorage.setItem("playlist", JSON.stringify(list));
    seticon(!icon)
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

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
              {songsinarray.some((arritem) => arritem.id === item.id) ? (
                <FavoriteIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    right: "15px",
                    top: "15px",
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    right: "15px",
                    top: "15px",
                  }}
                  onClick={() => setplaylist(item)}
                />
              )}

              <div
                className="wrapper"
                onClick={() => {
                  setcurrentsong(item);
                  setqueue(songs.slice(index));
                }}
              >
                <div className="info-wrapper">
                  <img
                    src={item.image[1].link}
                    alt="LogoMusicImage"
                    className="player-image"
                  />
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
