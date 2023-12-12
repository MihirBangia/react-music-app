import axios from "axios";
import React, { useEffect, useState } from "react";
import DrawerAppBar from "../Navbar/navbar";
import Albums from "../Albums/albums";
import ApiPlaylists from "../ApiPlaylist/apiPlaylist";
import ApiCharts from "../ApiCharts/apiCharts";
 
export default function Home() {
 
  return (
    <div>
      <DrawerAppBar />
      <Albums />
      <ApiPlaylists />
      <ApiCharts />
    </div>
  );
}