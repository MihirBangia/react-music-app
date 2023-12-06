import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styles from "./albumsongs.module.css"; // Import the CSS module

export default function AlbumSongs() {
  const location = useLocation();
  const [songsinalbum, setsongsinalbum] = useState([]);
  const [reload, setreload] = useState(false);

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
              <h1>{truncate(songsinalbum?.name,15)}</h1>
            </div>
          </div>
          <ul className={styles.songList}>
            {songsinalbum?.songs.map((item, index) => (
              <li key={index} className={styles.songItem}>
                <span>
                  {index+1}. {truncate(item.name, 20)}
                </span>
                <span>{formatTime(item.duration)}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h1 style={{backgroundColor:'white',color:'black'}}>Loading...</h1>
      )}
    </div>
  );
}
