import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./albumsongs.module.css"; // Import the CSS module
import Player from "../player/player";

export default function AlbumSongs() {
  const location = useLocation();
  const [songsinalbum, setsongsinalbum] = useState([]);
  const [currentsong, setcurrentsong] = useState(null);
  const [reload, setreload] = useState(false);
  const [queue, setqueue] = useState([]);
  const [list, setlist] = useState([]);
  const [icon, seticon] = useState(true);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

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
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/userplaylist`,
      {
        withCredentials: true,
        baseURL: process.env.REACT_APP_BACKEND_URL,
      }
    );
    setlist(response.data.songs);
  }

  useEffect(() => {
    getplaylistdata();
  }, []);

  async function getAlbumSongs() {
    let res = await axios.get(
      `https://saavn.me/albums?link=${location.state.link}`
    );
    setsongsinalbum(res.data.data);
    setreload(!reload);
  }
  useEffect(() => {
    getAlbumSongs();
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

      <div className={styles.main}>
        {songsinalbum.id > 0 ? (
          <>
            <div className={styles.albumSection}>
              <img
                className={styles.albumCover}
                src={songsinalbum?.image[2].link}
                alt="Album Cover"
              />
              <div className={styles.albumInfo}>
                <h1>{truncate(songsinalbum?.name, 15)}</h1>
              </div>
            </div>
            <ul className={styles.songList}>
              {songsinalbum?.songs.map((item, index) => (
                <>
                  <li key={index} className={styles.songItem}>
                    <div
                      onClick={() => {
                        setcurrentsong(item);
                        setqueue(songsinalbum.songs.slice(index));
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "10px",
                        width: "92%",
                      }}
                    >
                      <span>
                        {index + 1}. {truncate(item.name, 20)}
                      </span>

                      <span>{formatTime(item.duration)}</span>
                    </div>
                    {list !== "NOT_LOGGED_IN" &&
                    list?.some((arritem) => arritem.id === item.id) ? (
                      <FavoriteIcon
                        sx={{
                          color: "red",
                        }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{
                          color: "black",
                        }}
                        onClick={() => setplaylist(item)}
                      />
                    )}
                  </li>
                </>
              ))}
            </ul>
          </>
        ) : (
          <h1 style={{ backgroundColor: "white", color: "black" }}>
            Loading...
          </h1>
        )}
      </div>
      {currentsong && (
        <div style={{ marginTop: "160px" }}>
          <Player queue={queue} />
        </div>
      )}
    </>
  );
}
