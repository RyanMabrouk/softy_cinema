import React, { useContext, useEffect, useState } from "react";

import time from "../../assets/time.svg";
import grey_star from "../../assets/grey_star.svg";
import no_poster from "../../assets/no-poster.png";
import close from "../../assets/close.svg";

import Recommandations from "./Recommandations";
import SearchContext from "../../Context/SearchContext";
import useData from "../../hooks/useData";
import { Stars } from "./Stars";

export default function Details(props) {
  const { setCardClicked, cardClicked } = useContext(SearchContext);
  //-------------------------------------
  const [runtime, setRuntime] = useState(null);
  const [genres, setGenres] = useState([]);
  const [poster, setPoster] = useState(null);
  const [title, setTitle] = useState(null);
  const [rating, setRating] = useState(null);
  const [date, setDate] = useState(null);
  const [plot, setPlot] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  //-------------------------------------
  const [movieData] = useData(
    `/movie/${String(cardClicked)}?language=en-US`,
    cardClicked
  );
  //--------------------DATA------------------------
  useEffect(() => {
    if (movieData) {
      setRuntime(movieData.runtime);
      setGenres(
        movieData.genres.map((e) => {
          return e.name;
        })
      );
      setPoster(
        movieData.poster_path
          ? "https://image.tmdb.org/t/p/original" + movieData.poster_path
          : null
      );
      setBackgroundImage(
        movieData?.backdrop_path
          ? "url(" +
              "https://image.tmdb.org/t/p/original" +
              movieData.backdrop_path +
              ")"
          : "url(" + poster + ")"
      );
      setTitle(movieData.original_title);
      setRating(movieData.vote_average?.toFixed(1));
      setDate(movieData.release_date);
      setPlot(movieData.overview);
    }
  }, [movieData]);
  return (
    <div className={props.className ? props.className : "details_container"}>
      <img className="poster" src={poster ? poster : no_poster} alt="" />
      <div
        style={{
          backgroundImage: backgroundImage,
        }}
      >
        <div className="right_container">
          <div className="title">
            {title}
            <Stars />
          </div>
          <div className="runtime">
            <img src={time} alt="" />
            <span>{runtime + " minutes"}</span>
          </div>
          <div className="rating">
            <img src={grey_star} alt="" />
            <span>{rating + " (IMDB)"}</span>
          </div>
          <div className="release">
            Release date
            <p>
              <span>{date}</span>
            </p>
          </div>
          <div className="genres">
            Genre
            <p>
              <span>{genres.join(" - ")}</span>
            </p>
          </div>
          <div className="plot">
            Plot
            <p>
              <span>{plot}</span>
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
