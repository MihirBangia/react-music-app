import React, { useState } from "react";
import ListingPlaylist from "./listingplaylist";
import DrawerAppBar from "../Navbar/navbar";
import "./playlist.css";
import { ToastContainer, toast } from "react-toastify";

export default function Playlist() {
  let playlist = localStorage.getItem("playlist");
  let songsinarray = JSON.parse(playlist);
  let[reload,setreload] = useState(false);

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

  function deletefromplaylist(item) {
    const indexofitem = songsinarray.indexOf(item);
    if (indexofitem > -1) {
      songsinarray.splice(indexofitem, 1);
      notify();
    }
    localStorage.setItem("playlist", JSON.stringify(songsinarray));
    setreload(!reload);
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
