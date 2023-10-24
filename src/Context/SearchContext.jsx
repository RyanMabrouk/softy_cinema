import React, { createContext , useState } from "react";
import useData from "../hooks/useData";

const SearchContext = createContext();
export default SearchContext;

export function Context(props) {
  const [query, setQuery] = useState("");
  const [cardClicked, setCardClicked] = useState(null);
  const [searchData, refreshSearch, loading] = useData(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=${1}`,
    query,
    500
  );
  const [favoriteData, refreshFavorite] = useData(
    `/account/20285930/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`
  );
  const [ratedData, refreshRated] = useData(
    `/account/20285930/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
    null,
    1000
  );
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
