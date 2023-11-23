import React, { useEffect, useState } from "react";
import ListingPlaylist from "./listingplaylist";
import DrawerAppBar from "../Navbar/navbar";
import "./playlist.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Playlist() {
  let [songsinarray, setsonginarray] = useState([]);
  const navigate = useNavigate()

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

  async function getplaylistdata() {
    let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/userplaylist`, {
      withCredentials: true,
      baseURL: process.env.REACT_APP_BACKEND_URL
    });
    console.log(response);
    if (response.data.songs === "NOT_LOGGED_IN") {
      setTimeout(() => {
        navigate('/login')
      }, 1000);
      notify("Please Login First for Playlist", toast.warning)
    } else {
      setsonginarray(response.data.songs);
    }
  }

  useEffect(() => {
    getplaylistdata();
  }, [songsinarray]);



  async function deletefromplaylist(item) {
    let response1 = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/deletesong`,
      item,
      {
        withCredentials: true,
        baseURL: process.env.REACT_APP_BACKEND_URL
      }
    );
    setsonginarray(response1.data.songs);
    notify("Removed from Playlist", toast.success);
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
