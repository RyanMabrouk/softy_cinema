import { useContext, useEffect, useState } from "react";
import fetchData from "../Api/fetchData.js";
import useDebounce from "./useDibounce.jsx";
import UserContext from "../Context/UserContext.jsx";

export default function useData(url, query = null, delay = 0) {
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState(null);
  const dibouncedQuery = useDebounce(query, delay);
  const dibouncedRefresh = useDebounce(refresh, delay);
  const { sessionId } = useContext(UserContext);
  //---------------------------------
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      if (query !== "" && sessionId !== null) {
        try {
          setLoading(true);
          setData(await fetchData(url));
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setData(null);
      }
    }

    getData();
  }, [dibouncedQuery, dibouncedRefresh]);
  return [data, setRefresh, loading];
}
