import React, { useEffect, useState } from "react";

import time from "../../assets/time.svg";
import grey_star from "../../assets/grey_star.svg";
import no_poster from "../../assets/no-poster.png";
import close from "../../assets/close.svg";

import fetchData from "../Api/fetchData";
import Swiper from "../CustomSwiper";
import { SwiperSlide } from "swiper/react";

export default function Details(props) {
  const [data, setData] = useState(null);
  const [id, setId] = useState(props.id);
  if (id !== props.id) {
    setId(props.id);
  }
  //-------------------------------------
  const [recommendationsData, setRecommendationsData] = useState(null);
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
      setRecommendationsData(
        await fetchData(
          `/movie/${String(id)}/recommendations?language=en-US&page=1`
        )
      );
    }
    getData();
    console.log(id, " was selected ");
  }, [id, setId]);
  //generating data
  useEffect(() => {
    console.log(data);
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

  const recommendationsSlides = recommendationsData?.map((e) => {
    return (
      <SwiperSlide key={e.id + "rec"}>
        <label className="recommandations" htmlFor={e.id + "recommanded"}>
          <img
            src={
              e.poster_path
                ? "https://image.tmdb.org/t/p/original" + e.poster_path
                : no_poster
            }
            alt=""
          />
          <p>{e.title}</p>
        </label>
        <input
          type="button"
          id={e.id + "recommanded"}
          onClick={() => {
            props.setCardClicked(e.id);
          }}
        />
      </SwiperSlide>
    );
  });
  return (
    <div className={props.className ? props.className : "details_container"}>
      <img className="poster" src={poster ? poster : no_poster} alt="" />
      <div
        style={{
          backgroundImage:
            "url(" +
            "https://image.tmdb.org/t/p/original" +
            data?.backdrop_path +
            ")",
        }}
      >
        <div className="right_container">
          <div className="title">{title}</div>
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
          {recommendationsData?.length>0 && (
            <div className="recommandations_container">
              Recommandations
              <br />
              <Swiper
                slides={recommendationsSlides}
                navigation={true}
                slidesPerView="auto"
                spaceBetween="10"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
