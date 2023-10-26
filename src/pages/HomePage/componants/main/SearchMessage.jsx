import React, { useContext } from "react";
import Loader from "../../../Loader";
import SearchContext from "../../../../Context/SearchContext";

export function SearchMessage() {
  const { query, loading } = useContext(SearchContext);
  return (
    <h1 className="no_results">
      {query?.length > 0 ? (
        loading ? (
          <Loader />
        ) : (
          "No Results!"
        )
      ) : (
        "Search For Something!"
      )}
    </h1>
  );
}
