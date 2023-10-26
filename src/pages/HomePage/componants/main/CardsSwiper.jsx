import React, { useContext, memo } from "react";
import { SwiperSlide } from "swiper/react";

import Card from "../Card/Card.jsx";
import Swiper from "../../../CustomSwiper.jsx";
import SearchContext from "../../../../Context/SearchContext";
import { SearchMessage } from "./SearchMessage";

export default memo(function CardSwiper(props) {
  const { favoriteData } = useContext(SearchContext);
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
          watched={favoriteData?.map((e) => e.id).includes(e.id)}
          type={props.type}
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
            slides?.length > 0
              ? slides
              : props.type === "search" && <SearchMessage />
          }
          navigation={true}
          slidesPerView="auto"
        />
      </section>
    </>
  );
});
