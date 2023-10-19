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
      props.setLoading(true)
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
      props.setLoading(false)
    }
    console.log("query = ", query);
    getData();
  }, [dibouncedQuery, refresh, setRefresh]);
  //console.log(data ? data : null);
  //console.log(favourite ? favourite : null);
  return (
    <main>
      <CardSwiper
        name={"Movies"}
        data={data}
        fav_data={favourite}
        sort={true}
        query={dibouncedQuery}
        setRefresh={setRefresh}
        setCardClicked={setCardClicked}
        loading={props.loading}
      />

      <CardSwiper
        name={"Watched"}
        data={favourite}
        sort={false}
        setRefresh={setRefresh}
        setCardClicked={setCardClicked}
      />
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
