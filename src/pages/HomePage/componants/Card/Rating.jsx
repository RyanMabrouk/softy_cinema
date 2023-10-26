import React, { useContext } from "react";
import { Tooltip } from "antd";
import SearchContext from "../../../../Context/SearchContext";
import UserContext from "../../../../Context/UserContext";
import deleteData from "../../../../Api/deleteData"

export function Rating(props) {
  const { refreshRated } = useContext(SearchContext);
  const { sessionId } = useContext(UserContext);
  async function deleteRating() {
    props.setLoading(true);
    const res = await deleteData(`/movie/${props.id}/rating$`, sessionId);
    if (res.success) {
      refreshRated((old) => !old);
      props.setLoading(false);
    } else {
      console.error(res.error);
    }
  }
  return (
    <>
      <label htmlFor={props.id + "del_rating"}>
        <Tooltip
          placement="top"
          title={<span>You Rated This Movie {props.userRating}</span>}
        >
          <div>
            <span>{props.userRating.toFixed(1)}</span>
          </div>
        </Tooltip>
      </label>
      <input
        type="button"
        id={props.id + "del_rating"}
        onClick={deleteRating}
      />
    </>
  );
}
