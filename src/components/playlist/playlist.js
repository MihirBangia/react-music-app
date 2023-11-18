import React from 'react'
import ListingPlaylist from './listingplaylist';
import DrawerAppBar from '../Navbar/navbar';
import './playlist.css'

export default function Playlist() {
    let playlist = localStorage.getItem('playlist');
    let songsinarray = JSON.parse(playlist);

    function deletefromplaylist(item){
      const indexofitem = songsinarray.indexOf(item)  
      if (indexofitem > -1) { 
        songsinarray.splice(indexofitem, 1); 
      }
      console.log(songsinarray)
    }

    if(songsinarray){
        return(
        <>
            <DrawerAppBar />
            <ListingPlaylist songsinarray={songsinarray} deletefromplaylist={deletefromplaylist}/>
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
