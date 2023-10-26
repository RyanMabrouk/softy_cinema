import React, { createContext, useState, useContext, useEffect } from "react";
import useData from "../hooks/useData";
import UserContext from "./UserContext";

const SearchContext = createContext();
export default SearchContext;

export function Context(props) {
  const { sessionId } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [cardClicked, setCardClicked] = useState(null);
  const [searchData, refreshSearch, loading] = useData(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=${1}`,
    query,
    500
  );
  const [favoriteData, refreshFavorite] = useData(
    `/account/20285930/favorite/movies?language=en-US&page=1${
      sessionId !== null ? "&session_id=" + sessionId : ""
    }&sort_by=created_at.asc`,
    null,
    500
  );

  const [ratedData, refreshRated] = useData(
    `/account/20285930/rated/movies?language=en-US&page=1${
      sessionId !== null ? "&session_id=" + sessionId : ""
    }&sort_by=created_at.asc`,
    null,
    1000
  );
  useEffect(() => {
    refreshRated((old) => !old);
    refreshFavorite((old) => !old);
    setQuery("");
  }, [sessionId]);

  return (
    <SearchContext.Provider
      value={{
        searchData,
        refreshSearch,
        favoriteData,
        refreshFavorite,
        ratedData,
        refreshRated,
        //-------
        cardClicked,
        setCardClicked,
        loading,
        query,
        setQuery,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
