import React, { useEffect, useState, useRef, useMemo } from "react";
import StarRatings from "react-star-ratings";

import time from "../../assets/time.svg";
import grey_star from "../../assets/grey_star.svg";
import no_poster from "../../assets/no-poster.png";
import close from "../../assets/close.svg";

import fetchData from "../../Api/fetchData";
import Recommandations from "./Recommandations";
import postData from "../../Api/postData";

export default function Details(props) {
  const [data, setData] = useState(null);
  const [id, setId] = useState(props.id);
  if (id !== props.id) {
    setId(props.id);
  }
  //-------------------------------------
  const [userRating, setUserRating] = useState(
    props.ratedData?.find((e) => e.id === props.id)?.rating
  );
  const [runtime, setRuntime] = useState(null);
  const [genres, setGenres] = useState([]);
  const [poster, setPoster] = useState(null);
  const [title, setTitle] = useState(null);
  const [rating, setRating] = useState(null);
  const [date, setDate] = useState(null);
  const [plot, setPlot] = useState(null);
  //-------------------------------------

  useEffect(() => {
    async function getData() {
      setData(await fetchData(`/movie/${String(id)}?language=en-US`));
    }
    getData();
    //console.log(id, " was selected ");
  }, [id, setId]);
  //UPDATE USER RATING
  useEffect(() => {
    if (props.ratedData?.find((e) => e.id === props.id)?.rating != userRating) {
      async function upadteRating() {
        const res = await postData(
          {
            value: userRating,
          },
          `/movie/${props.id}/rating`
        );
        if (res.success) {
          console.log("success");
          props.setRefreshRated((old) => !old);
        }
      }
      upadteRating();
    }
  }, [userRating, setUserRating]);
  //DATA
  useEffect(() => {
    if (data) {
      setRuntime(data.runtime);
      setGenres(
        data.genres.map((e) => {
          return e.name;
        })
      );
      setPoster(
        data.poster_path
          ? "https://image.tmdb.org/t/p/original" + data.poster_path
          : null
      );
      setTitle(data.original_title);
      setRating(data.vote_average?.toFixed(1));
      setDate(data.release_date);
      setPlot(data.overview);
    }
  }, [data, setData]);
  return (
    <div className={props.className ? props.className : "details_container"}>
      <img className="poster" src={poster ? poster : no_poster} alt="" />
      <div
        style={{
          backgroundImage: data?.backdrop_path
            ? "url(" +
              "https://image.tmdb.org/t/p/original" +
              data.backdrop_path +
              ")"
            : "url(" +
              "https://image.tmdb.org/t/p/original" +
              data?.poster_path +
              ")",
        }}
      >
        <div className="right_container">
          <div className="title">
            {title}
            <div card="user_rating">
              <StarRatings
                rating={userRating}
                starRatedColor="yellow"
                starHoverColor="yellow"
                changeRating={setUserRating}
                numberOfStars={10}
                name="rating"
                starDimension="15px"
                starSpacing="1px"
              />
            </div>
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
              onClick={() => props.setCardClicked(null)}
            />
          </div>
          <Recommandations setCardClicked={props.setCardClicked} id={id} />
        </div>
      </div>
    </div>
  );
}
