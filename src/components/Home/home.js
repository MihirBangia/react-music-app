import axios from "axios";
import React, { useEffect, useState } from "react";
import DrawerAppBar from "../Navbar/navbar";
import Card from "../Card/card";
 
export default function Home() {
  let [songs, setsongs] = useState([]);
 
  async function gethomepagedata() {
    let { data } = await axios.get(
      "https://saavn.me/search/songs?query=top+bollywood"
    );
    setsongs(data.data.results);
  }
 
  async function getsearchresults(searchsongs) {
    let { data } = await axios.get(
      `https://saavn.me/search/songs?query=${searchsongs}`
    );
    setsongs(data.data.results);
  }
 
  function onSubmit(event) {
    if (event.target.value.length === 0) {
      gethomepagedata();
    } else {
      getsearchresults(event.target.value);
    }
  }
 
  useEffect(() => {
    gethomepagedata();
  }, []);
 
  return (
    <div>
      <DrawerAppBar onSubmit={onSubmit} />
      <Card songs={songs} />
    </div>
  );
}