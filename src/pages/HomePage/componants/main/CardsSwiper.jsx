import React, { memo, useState } from "react";
import { SwiperSlide } from "swiper/react";

import Card from "../Card/Card.jsx";
import Swiper from "../../../UI/CustomSwiper.jsx";
import { SearchMessage } from "./SearchMessage";
import { useSelector } from "react-redux";
import { DeleteIcon } from "./DeleteIcon.jsx";

export default memo(function CardSwiper(props) {
  const favoriteData = useSelector((state) => state.data.favoriteData);
  const [toggle, setToggle] = useState(props.type !== "list");
  const data = props.data ? [...props.data] : [];
  if (props.sort) {
    data.sort((a, b) => {
      return b[props.sort] - a[props.sort];
    });
  }
  function handleToggle() {
    setToggle((old) => !old);
  }

  const slides = data?.map((e) => {
    return (
      <SwiperSlide key={e.id + "/" + props.ListId}>
        <Card
          //ELEMENT
          id={e.id}
          title={e.title}
          poster={
            e.poster_path
              ? "https://image.tmdb.org/t/p/original" + e.poster_path
              : null
          }
          popularity={e.popularity}
          date={e.release_date}
          rating={e.vote_average?.toFixed(1)}
          userRating={e.rating}
          watched={favoriteData?.map((e) => e.id).includes(e.id)}
          type={props.type}
          listId={props.ListId}
        />
      </SwiperSlide>
    );
  });
  return (
    <>
      {data?.length >= 0 && (
        <header>
          <label htmlFor={"toggle" + props.name}>
            <h1 className="toggle">{toggle ? "-" : "+"}</h1>
          </label>
          <input
            type="button"
            id={"toggle" + props.name}
            onClick={handleToggle}
          />
          <h1>{props.name}</h1>
          {props.allowDelete && <DeleteIcon {...props} />}
        </header>
      )}
      {toggle && (
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
      )}
    </>
  );
});
