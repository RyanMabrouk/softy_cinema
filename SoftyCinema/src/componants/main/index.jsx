import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

import Card from "./card";
import CardSwiper from "../CustomSwiper";
import fetchData from "../Api/fetchData";
import useDebounce from "../../hooks/useDibounce";
import Details from "../details";

export default function Main(props) {
  //SELECT
  const [cardClicked, setCardClicked] = useState(null);
  //DATA
  const [data, setData] = useState(null);
  const [favourite, setFavourite] = useState(null);
  //SEARCH & LISTS
  const [refresh, setRefresh] = useState(null);
  const [query, setQuery] = useState(null);
  const dibouncedQuery = useDebounce(query, 500);
  //Number of results
  props.setResults(data?.length);
  //Sync querys
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
  }, [dibouncedQuery,refresh,setRefresh]);
  useEffect(() => {
    async function getData() {
      setFavourite(
        await fetchData(
          `/account/20285930/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`
        )
      );
    }
    getData();
  }, [refresh]);
  //console.log(data ? data : null);
  //Favourite
  const favourite_slides = favourite?.map((e) => {
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
          setCardClicked={setCardClicked}
        />
      </SwiperSlide>
    );
  });
  //console.log(favourite)
  //Search
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
          watched={favourite?.map((e) => e.id).includes(e.id)}
          setCardClicked={setCardClicked}
        />
      </SwiperSlide>
    );
  });

  return (
    <main>
      {search_slides?.length > 0 && (
        <div>
          <h1>Movies</h1>
        </div>
      )}
      <section>
        <CardSwiper
          className={"cards_container"}
          slides={
            search_slides?.length > 0 ? (
              search_slides
            ) : dibouncedQuery?.length > 0 ? (
              <h1 className="no_results">No Results</h1>
            ) : null
          }
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
      {cardClicked && (
        <Details
          key={cardClicked + "details"}
          id={cardClicked}
          className={"details_container details_container_visible"}
          setCardClicked={setCardClicked}
        />
      )}
    </main>
  );
}
