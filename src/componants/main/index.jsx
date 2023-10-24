import React from "react";
import { useContext } from "react";
import SearchContext from "../../Context/SearchContext.jsx";

import CardSwiper from "./CardsSwiper";
import Details from "../details";

export default function Main() {
  const { searchData, favoriteData, ratedData, cardClicked } =
    useContext(SearchContext);
  //SELECT
  return (
    <main>
      <CardSwiper
        key={1}
        name={"Movies"}
        data={searchData}
        sort={"popularity"}
        type={"search"}
      />
      <CardSwiper key={2} name={"Favorites"} data={favoriteData} type={"list"}/>
      <CardSwiper
        key={3}
        name={"Rated Movies"}
        data={ratedData}
        sort={"rating"}
        type={"list"}
      />
      {cardClicked && (
        <Details
          key={cardClicked + "details"}
          className={"details_container details_container_visible"}
        />
      )}
    </main>
  );
}
