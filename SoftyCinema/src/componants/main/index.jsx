import React, { useEffect, useState } from "react";

import CardSwiper from "./CardsSwiper";
import fetchData from "../Api/fetchData";
import useDebounce from "../../hooks/useDibounce";
import Details from "../details";

export default function Main(props) {

  //SELECT
  const [cardClicked, setCardClicked] = useState(null);
  //DATA
  const [data, setData] = useState(null);
  const [favourite, setFavourite] = useState(null);
  const [ratedData, setRatedData] = useState(null);
  //SEARCH & LISTS
  const [refresh, setRefresh] = useState(null);
  const [refreshRated, setRefreshRated] = useState(false);
  const dibouncedRefreshRated = useDebounce(refreshRated,1000)
  console.log("🚀 ~ file: index.jsx:18 ~ Main ~ refreshRated:", refreshRated);
  //SYNC QUERY
  const [query, setQuery] = useState(props.query);
  const dibouncedQuery = useDebounce(query, 500);
  if (props.query !== query) {
    setQuery(props.query);
  }

  //Number of results
  props.setResults(data?.length);
  useEffect(() => {
    async function getData() {
      props.setLoading(true);
      setData([
        ...(await fetchData(
          `/search/movie?query=${dibouncedQuery}&include_adult=false&language=en-US&page=1`
        )),
        ...(await fetchData(
          `/search/movie?query=${dibouncedQuery}&include_adult=false&language=en-US&page=2`
        )),
      ]);
      setFavourite(
        await fetchData(
          `/account/20285930/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`
        )
      );
      props.setLoading(false);
    }
    console.log("query = ", query);
    getData();
  }, [dibouncedQuery, refresh]);
  useEffect(() => {
    async function getData() {
      setRatedData(
        await fetchData(
          `/account/20285930/rated/movies?language=en-US&page=1&sort_by=created_at.asc`
        )
      );
    }
    console.log("fetching...")
    getData();
  }, [dibouncedRefreshRated]);
  //console.log(data ? data : null);
  //console.log(favourite ? favourite : null);
  return (
    <main>
      <CardSwiper
        key={1}
        name={"Movies"}
        data={data}
        fav_data={favourite}
        sort={"popularity"}
        query={dibouncedQuery}
        setRefresh={setRefresh}
        setCardClicked={setCardClicked}
        setRefreshRated={setRefreshRated}
        loading={props.loading}
      />
      <CardSwiper
        key={2}
        name={"Watched"}
        data={favourite}
        sort={false}
        setRefresh={setRefresh}
        setCardClicked={setCardClicked}
        setRefreshRated={setRefreshRated}
      />
      <CardSwiper
        key={3}
        name={"Rated Movies"}
        data={ratedData}
        sort={"rating"}
        setRefresh={setRefresh}
        setCardClicked={setCardClicked}
        setRefreshRated={setRefreshRated}
      />
      {cardClicked && (
        <Details
          key={cardClicked + "details"}
          id={cardClicked}
          className={"details_container details_container_visible"}
          setCardClicked={setCardClicked}
          ratedData={ratedData}
          setRefreshRated ={setRefreshRated}
        />
      )}
    </main>
  );
}
