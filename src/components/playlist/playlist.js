import React from 'react'
import ListingPlaylist from './listingplaylist';
import DrawerAppBar from '../Navbar/navbar';
import './playlist.css'

export default function Playlist() {
    let playlist = localStorage.getItem('playlist');
    let songsinarray = JSON.parse(playlist);
    if(songsinarray){
        return(
        <>
            <DrawerAppBar />
            <ListingPlaylist songsinarray={songsinarray}/>
        </>
          )
    }

  return(
    <>
    <DrawerAppBar />
    <h2>Please Add a Song to Playlist</h2>
    </>
)
}
