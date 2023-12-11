import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from './search.module.css'

export default function SearchComponent(props) {
  const [songs, setsongs] = useState([]);

  async function getsearchresults() {
    let { data } = await axios.get(
      `https://saavn.me/search/songs?query=${props.searchword}`
    );
    setsongs(data.data.results);
  }

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  useEffect(() => {
    getsearchresults();
  }, [props.searchword]);

  console.log(props.searchword);

  return (
    <div className={styles.searchDiv}>
      {songs.map((item, index) => {
        return (
            <div className={styles.songSearchItem}>
                <img
                  src={item.image[2].link}
                  alt="songimg"
                  style={{ width: "12%", height: "auto" }}
                />
              <div className={styles.songDetails}>
                <p className={styles.songName}>{truncate(item.name,50)}</p>
                <p className={styles.songArtists}>{item.primaryArtists}</p>
              </div>
            </div>
        );
      })}
    </div>
  );
}
