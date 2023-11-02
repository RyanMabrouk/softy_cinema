import React, { useContext } from "react";
import { Tooltip } from "antd";
import UserContext from "../../../../Context/UserContext";
import deleteData from "../../../../Services/deleteData";
import { useDispatch } from "react-redux";
import { updateRated } from "../../../../Store/dataSlice";

export function Rating(props) {
  const dispatch = useDispatch();
  const { sessionId } = useContext(UserContext);
  async function deleteRating() {
    props.setLoading(true);
    try {
      const res = await deleteData(`/movie/${props.id}/rating`, sessionId);
      if (res?.success) {
        setTimeout(() => dispatch(updateRated(sessionId)), 1000);
      }
    } finally {
      props.setLoading(false);
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
