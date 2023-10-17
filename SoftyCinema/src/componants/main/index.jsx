import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Card from "./card";
import CardSwiper from "../CustomSwiper";
import fetchData from "../Api/fetchData";
import useDebounce from "../../hooks/useDibounce";

export default function Main(props) {
  //DATA
  const [data, setData] = useState(null);
  const [favourite, setFavourite] = useState(null);
  //SEARCH & LISTS
  const [refresh, setRefresh] = useState(null);
  const [query, setQuery] = useState("");
  const dibouncedQuery = useDebounce(query, 500);

  props.setResults(data?.length);
  if (props.query !== query) {
    setQuery(props.query);
  }
  useEffect(() => {
    async function getData() {
      setData(
        await fetchData(
          `/search/movie?query=${dibouncedQuery}&include_adult=false&language=en-US&page=1`
        )
      );
    }
    console.log("query = ", query);
    getData();
  }, [dibouncedQuery]);
  useEffect(() => {
    async function getData() {
      setFavourite(
        await fetchData(
          `/account/20285930/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`
        )
      );
    }
    getData();
    console.log("refresh");
  }, [refresh]);
  //console.log(data ? data : null);
  const search_slides = data?.map((e) => {
    return (
      <SwiperSlide key={e.id}>
        <Card
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
          refresh={setRefresh}
        />
      </SwiperSlide>
    );
  });
  const favourite_slides = favourite?.map((e, i) => {
    return (
      <SwiperSlide key={e.id}>
        <Card
          key={e.id}
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
          type="favorite"
          refresh={setRefresh}
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
          slides={search_slides?search_slides:(<h1>No Results</h1>)}
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
          slides={favourite_slides}
          navigation={true}
          slidesPerView="auto"
        />
      </section>
    </main>
  );
}
