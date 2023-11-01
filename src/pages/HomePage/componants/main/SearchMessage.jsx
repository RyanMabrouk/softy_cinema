import React from "react";
import Loader from "../../../UI/Loader";
import { useSelector } from "react-redux";

export function SearchMessage() {
  //const { query, loading } = useContext(SearchContext);
  const { query } = useSelector((state) => state.data.query);
  const loading = useSelector((state) => state.data.searchData.loading);
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
