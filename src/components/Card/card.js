import React from "react";
import "./card.css";
import ReactAudioPlayer from "react-audio-player";

export default function Card(props) {
  let songs = props.songs;

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  return (
    <div style={{'display':'flex','flexWrap':'wrap','justifyContent':'center'}}>
        
            {songs?.map((item,index)=>
            <div id="boxes">
            <div id="player02" class="player horizontal">
                <div class="wrapper">
                  <div class="info-wrapper">
                    <img
                      src={item.image[1].link}
                      alt="LogoMusicImage"
                    />
                    <div class="info">
                      <h1>
                       {truncate(item.name,10)}
                      </h1>
                      <p>{truncate(item.primaryArtists,10)}</p>
                    </div>
                    <div class="controls">
                        <ReactAudioPlayer src={item.downloadUrl[3].link} controls/>
                        </div>
                  </div>
                </div>
              </div>
              </div>
            )
        }
     
    </div>
  );
}
