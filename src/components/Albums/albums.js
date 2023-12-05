import axios from "axios";
import React, { useEffect, useState } from "react";
import "./albums.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

export default function Albums() {
  const [albums, setalbums] = useState([]);
  const navigate = useNavigate();

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
    setalbums(res.data.data.albums);
  }

  function redirectToList(albumlink){
    navigate('/albumsongs',{state:{link:albumlink}});
  }

  useEffect(() => {
    getalbums();
  }, []);

  return (
    <div>
      <h1 style={{ color: "white" }}>Top Albums</h1>
      <div className="album-container">
          <Slider {...settings} className="slider" adaptiveHeight>
        {albums?.map((item, index) => {
          if(item.type==="album"){
          return (
            <div className="album-item" key={index} onClick={()=>redirectToList(item.url)}>
              <img
                className="album-cover"
                src={item.image[2].link}
                alt="Album 1 Cover"
              />
              <div className="album-info">
                <p className="album-title">{truncate(item.name,10)}</p>
                <p className="artist">Language: {item.language}</p>
              </div>
            </div>
          );
        }})}
        </Slider>
      </div>
    </div>
  );
}
