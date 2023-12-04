import axios from "axios";
import React, { useEffect, useState } from "react";
import "./albums.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DrawerAppBar from "../Navbar/navbar";
import Slider from "react-slick";
import ApiPlaylists from "../ApiPlaylist/apiPlaylist";
import ApiCharts from "../ApiCharts/apiCharts";

export default function Albums() {
  const [albums, setalbums] = useState([]);

  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows:false,
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

  useEffect(() => {
    getalbums();
  }, []);

  console.log(albums);
  return (
    <div>
      <DrawerAppBar />
      <h1 style={{ color: "white" }}>Top Albums</h1>
      <div class="album-container">
          <Slider {...settings} className="slider" adaptiveHeight>
        {albums?.map((item, index) => {
          return (
            <div class="album-item">
              <img
                class="album-cover"
                src={item.image[2].link}
                alt="Album 1 Cover"
              />
              <div class="album-info">
                <p class="album-title">{truncate(item.name,10)}</p>
                <p class="artist">Language: {item.language}</p>
              </div>
            </div>
          );
        })}
        </Slider>
      </div>
        <ApiPlaylists />
        <ApiCharts />
    </div>
  );
}
