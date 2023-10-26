import React, { useEffect, useMemo } from "react";
import { useContext } from "react";
import Details from "../details";
import SearchContext from "../../../../Context/SearchContext.jsx";
import CardsSwiper from "./CardsSwiper"

export default function Main() {
  const { searchData, favoriteData, ratedData, cardClicked } =
    useContext(SearchContext);
  return (
    <main>
      <CardsSwiper
        key={1}
        name={"Movies"}
        data={searchData}
        sort={"popularity"}
        type={"search"}
      />
      <CardsSwiper
        key={2}
        name={"Favorite"}
        data={favoriteData}
        type={"list"}
      />
      <CardsSwiper
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
