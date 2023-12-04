import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Albums/albums.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function ApiPlaylists() {
  const [albums, setalbums] = useState([]);

  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows:false,
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

  useEffect(() => {
    getalbums();
  }, []);

  return (
    <div>
      <h1 style={{ color: "white" }}>Top Playlists</h1>
      <div className="album-container">
          <Slider {...settings} className="slider" adaptiveHeight>
        {albums?.map((item, index) => {
          return (
            <div className="album-item" key={index}>
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
        })}
        </Slider>
      </div>
    </div>
  );
}
