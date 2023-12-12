import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Albums/albums.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

export default function ApiPlaylists() {
  const [albums, setalbums] = useState([]);
  const navigate = useNavigate();

  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows:false,
    easing:"ease",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  async function getalbums() {
    let res = await axios.get(
      "https://saavn.me/modules?language=hindi,english,punjabi"
    );
    setalbums(res.data.data.playlists);
  }


  function redirectToSongs(id){
    navigate('/playlistsongs',{state:{link:id}})
  }

  useEffect(() => {
    getalbums();
  }, []);

  return (
    <div>
      <h1 style={{ color: "white" }}>Top Playlists</h1>
      <div className="album-container">
          <Slider {...settings} className="slider" adaptiveHeight>
        {albums.length>0 ? albums?.map((item, index) => {
          return (
            <div className="album-item" key={index} onClick={()=>redirectToSongs(item.id)}>
              <img
                className="album-cover"
                src={item.image[2].link}
                alt="Album 1 Cover"
              />
              <div className="album-info">
                <p className="album-title">{truncate(item.title,10)}</p>
                <p className="artist">Songs: {item.songCount}</p>
              </div>
            </div>
          );
        }):<h1 style={{backgroundColor:'white',color:'black'}}>Loading...</h1>}
        </Slider>
      </div>
    </div>
  );
}
