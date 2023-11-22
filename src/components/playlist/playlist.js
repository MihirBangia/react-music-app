import React, { useEffect, useState } from "react";
import ListingPlaylist from "./listingplaylist";
import DrawerAppBar from "../Navbar/navbar";
import "./playlist.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Playlist() {
  let [songsinarray, setsonginarray] = useState([]);
  // let playlist = localStorage.getItem("playlist");
  // let songsinarray = JSON.parse(playlist);
  // let[reload,setreload] = useState(false);

  async function getplaylistdata() {
    let response = await axios.get("process.env.BACKEND_URL/userplaylist", {
      withCredentials: true,
    });
    setsonginarray(response.data.songs);
  }

  useEffect(() => {
    getplaylistdata();
  }, [songsinarray]);

  const notify = () => {
    toast.success("Removed from Playlist", {
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

  async function deletefromplaylist(item) {
    let response1 = await axios.post(
      "process.env.BACKEND_URL/deletesong",
      item,
      {
        withCredentials: true,
      }
    );
    setsonginarray(response1.data.songs);
    notify();
  }

  if (songsinarray) {
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

        <DrawerAppBar />
        <ListingPlaylist
          songsinarray={songsinarray}
          deletefromplaylist={deletefromplaylist}
        />
      </>
    );
  }

  return (
    <>
      <DrawerAppBar />
      <h2>Please Add a Song to Playlist</h2>
    </>
  );
}
