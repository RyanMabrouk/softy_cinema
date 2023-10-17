import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Card from "./card";
import CardSwiper from "../CustomSwiper";
import fetchData from "../fetchData";

export default function Main(props) {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("a");
  const [favourite,setFavourite] = useState(null)

  props.setResults(data?.length);
  if (props.query !== query) {
    setQuery(props.query);
  }
  useEffect(() => {
    async function getData() {
      setData(
        await fetchData(
          `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        )
      );
    }
    console.log("query = ", query);
    getData();
  }, [query]);
  console.log(data ? data : null);
  const search_slides = data?.map((e, i) => {
    return (
      <SwiperSlide>
        <Card
          key={e.id}
          title={e.original_title}
          poster={
            e.poster_path
              ? "https://image.tmdb.org/t/p/original" + e.poster_path
              : null
          }
          time={"3:00:00"}
          date={e.release_date}
          rating={e.vote_average?.toFixed(1)}
        />
      </SwiperSlide>
    );
  });
  return (
    <main>
      <div>
        <h1>Movies</h1>
      </div>
      <section>
        <CardSwiper
          className={"cards_container"}
          slides={search_slides}
          navigation={true}
          slidesPerView="auto"
        />
      </section>
      <div>
        <h1>Watched</h1>
      </div>
      <section>
        <CardSwiper
          className={"cards_container"}
          slides={search_slides}
          navigation={true}
          slidesPerView="auto"
        />
      </section>
    </main>
  );
}
