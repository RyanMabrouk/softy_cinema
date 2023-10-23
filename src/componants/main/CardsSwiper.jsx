import React from "react";
import { SwiperSlide } from "swiper/react";

import Card from "./Card";
import Swiper from "../CustomSwiper";
import Loader from "../Loader";

export default function CardSwiper(props) {
  props.sort
    ? props.data?.sort((a, b) => {
        return b[props.sort] - a[props.sort];
      })
    : props.data;
  const slides = props.data?.map((e) => {
    return (
      <SwiperSlide key={e.id}>
        <Card
          //ELEMENT
          id={e.id}
          title={e.original_title}
          poster={
            e.poster_path
              ? "https://image.tmdb.org/t/p/original" + e.poster_path
              : null
          }
          time={"3:00:00"}
          date={e.release_date}
          rating={e.vote_average?.toFixed(1)}
          userRating={e.rating}
          //PROPS
          refresh={props.setRefresh}
          watched={props.fav_data?.map((e) => e.id).includes(e.id)}
          setCardClicked={props.setCardClicked}
          type={props.fav_data ? null : "favorite"}
          setRefreshRated={props.setRefreshRated}
        />
      </SwiperSlide>
    );
  });
  return (
    <>
      {props.data?.length > 0 && (
        <div>
          <h1>{props.name}</h1>
        </div>
      )}
      <section>
        <Swiper
          className={"cards_container"}
          slides={
            slides?.length > 0 ? (
              slides
            ) : props.query?.length > 0 ? (
              <h1 className="no_results">
                {props.loading ? <Loader /> : "No Results"}
              </h1>
            ) : props.name === "Movies" ? (
              <h1 className="no_results">
                {props.loading ? (
                  props.data?.length > 0 ? (
                    <Loader />
                  ) : (
                    "Search For Something!"
                  )
                ) : (
                  "Search For Something!"
                )}
              </h1>
            ) : null
          }
          navigation={true}
          slidesPerView="auto"
        />
      </section>
    </>
  );
}
