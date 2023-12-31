import React, { useEffect, useState } from "react";
import "./card.css";
import Player from "../player/player";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Card(props) {
  let songs = props.songs;
  const [currentsong, setcurrentsong] = useState(null);
  const [queue, setqueue] = useState([]);
  const [list, setlist] = useState([]);
  const [icon, seticon] = useState(true);

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  const notify = (message, condition) => {
    condition(message, {
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

  async function setplaylist(song) {
    let { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/addtoplaylist`,
      song,
      { withCredentials: true, baseURL: process.env.REACT_APP_BACKEND_URL }
    );
    // console.log(data);
    setlist([...list, song]);
    notify("Added to Playlist", toast.success);
    seticon(!icon);
  }
  // console.log(icon)

  async function getplaylistdata() {
    let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/userplaylist`, {
      withCredentials: true,
      baseURL: process.env.REACT_APP_BACKEND_URL
    });
    setlist(response.data.songs);
  }

  useEffect(() => {
    getplaylistdata();
  }, []);

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
              {list !== "NOT_LOGGED_IN" && list?.some((arritem) => arritem.id === item.id) ? (
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


              {list === "NOT_LOGGED_IN" ? (
                <FavoriteBorderIcon
                sx={{
                  color: "white",
                  position: "absolute",
                  right: "15px",
                  top: "15px",
                }}
                onClick={()=>notify("Please Login First", toast.warning)}
              />
              ):''}

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
