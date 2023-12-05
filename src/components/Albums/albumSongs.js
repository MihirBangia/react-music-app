import React, { useEffect } from "react";
import axios from "axios";
import {useLocation} from 'react-router-dom';

export default function AlbumSongs() {
    const location = useLocation();
  async function getAlbumSongs(){
    let res = await axios.get(`https://saavn.me/albums?link=${location.state.link}`);
    console.log(res);
  }
  useEffect(()=>{
    getAlbumSongs()
  },[])
  return <div></div>;
}
