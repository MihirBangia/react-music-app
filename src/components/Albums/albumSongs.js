import React, { useEffect, useState } from "react";
import axios from "axios";
import {useLocation} from 'react-router-dom';
import './albumsongs.css'

export default function AlbumSongs() {
    const location = useLocation();
    const [songsinalbum,setsongsinalbum] = useState([]);
  async function getAlbumSongs(){
    let res = await axios.get(`https://saavn.me/albums?link=${location.state.link}`);
    setsongsinalbum(res.data.data);
  }
  useEffect(()=>{
    getAlbumSongs()
  },[])
  console.log(songsinalbum)
  return(
  <div className='main'>
 <div className="album-section">
      <img className="album-cover" src={songsinalbum?.image[2].link} alt="Album Cover" />
      <div className="album-info">
        <h1>{songsinalbum?.name}</h1>
      </div>
    </div>

    <ul className="song-list">
      <li className="song-item">
        <span>1. Song 1</span>
        <span>3:45</span>
      </li>
      <li className="song-item">
        <span>2. Song 2</span>
        <span>4:20</span>
      </li>
    </ul>

  </div>
  );
}
