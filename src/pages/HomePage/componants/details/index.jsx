import React, { useContext, useEffect, useState } from "react";

import time from "../../assets/time.svg";
import grey_star from "../../assets/grey_star.svg";
import no_poster from "../../assets/no-poster.png";
import close from "../../assets/close.svg";

import Recommandations from "./Recommandations";
import { Stars } from "./Stars";
import SearchContext from "../../../../Context/SearchContext";
import useData from "../../../../hooks/useData";

export default function Details(props) {
  const { setCardClicked, cardClicked } = useContext(SearchContext);
  //-------------------------------------
  const [poster, setPoster] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  //-------------------------------------
  const [movieData] = useData(
    `/movie/${String(cardClicked)}?language=en-US`,
    cardClicked
  );
  console.log("🚀 ~ file: index.jsx:22 ~ Details ~ cardClicked:", cardClicked);
  //--------------------DATA------------------------
  useEffect(() => {
    setPoster(
      movieData?.poster_path
        ? "https://image.tmdb.org/t/p/original" + movieData.poster_path
        : no_poster
    );
    setBackgroundImage(
      "url(" +
        "https://image.tmdb.org/t/p/original" +
        (movieData?.backdrop_path
          ? movieData.backdrop_path
          : movieData?.poster_path) +
        ")"
    );
  }, [movieData]);
  return (
    <div className={props.className ? props.className : "details_container"}>
      <img className="poster" src={poster} alt="" />
      <div
        style={{
          backgroundImage: backgroundImage,
        }}
      >
        <div className="right_container">
          <div className="title">
            {movieData?.original_title}
            <Stars />
          </div>
          <div className="runtime">
            <img src={time} alt="" />
            <span>{movieData?.runtime + " minutes"}</span>
          </div>
          <div className="rating">
            <img src={grey_star} alt="" />
            <span>{movieData?.vote_average?.toFixed(1) + " (IMDB)"}</span>
          </div>
          <div className="release">
            Release date
            <p>
              <span>{movieData?.release_date}</span>
            </p>
          </div>
          <div className="genres">
            Genre
            <p>
              <span>
                {movieData?.genres
                  .map((e) => {
                    return e.name;
                  })
                  .join(" - ")}
              </span>
            </p>
          </div>
          <div className="plot">
            Plot
            <p>
              <span>{movieData?.overview}</span>
            </p>
          </div>
          <div className="close_btn">
            <label htmlFor="close">
              <img src={close} alt="" />
            </label>
            <input
              type="button"
              id="close"
              onClick={() => setCardClicked(null)}
            />
          </div>
          <Recommandations />
        </div>
      </div>
    </div>
  );
}
