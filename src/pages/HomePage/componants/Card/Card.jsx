import React, { useContext, useState } from "react";
import Loader from "../../../UI/Loader";
import { Tooltip } from "antd";

import group from "../../assets/group.png";
import date from "../../assets/date.svg";
import star from "../../assets/star.svg";
import { Button as CardButton } from "./Button";
import { Poster } from "./Poster";
import UserContext from "../../../../Context/UserContext";
import postData from "../../../../Services/postData";
import { useDispatch } from "react-redux";
import { upadateFavourite, updateList } from "../../../../Store/dataSlice";
import { AddToList } from "./AddToList";

export default function Card(props) {
  const { sessionId } = useContext(UserContext);
  const dispatch = useDispatch();
  const [watched, setWatched] = useState(props.watched);
  const [loading, setLoading] = useState(false);
  if (watched !== props.watched) {
    setWatched(props.watched);
  }
  async function deleteFromList() {
    await dispatch(
      updateList({
        listId: props.listId,
        movieId: props.id,
        action: "delete",
        sessionId: sessionId,
      })
    );
  }
  async function toggleFavorite(action) {
    const res = await postData(
      {
        media_type: "movie",
        media_id: props.id,
        favorite: action,
      },
      `/account/20285930/favorite`,
      sessionId
    );
    if (res?.success) {
      setWatched(action);
      await dispatch(upadateFavourite(sessionId));
    }
  }
  async function toggle(action) {
    setLoading(true);
    try {
      if (props.listId) {
        await deleteFromList();
      } else {
        await toggleFavorite(action);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="card_container">
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="title_rating_container">
            <Tooltip placement="top" title={<span>{props.title}</span>}>
              <div className="title">{props.title}</div>
            </Tooltip>
            <div className="rating">
              <img src={star} alt="" fetchpriority="high" />
              {props.rating}
            </div>
            <div>
              <AddToList {...props} />
            </div>
          </div>
          <Poster {...props} setLoading={setLoading} />
          <div className="popularity_date_container">
            <div className="popularity">
              <img src={group} alt="" fetchpriority="high" />
              {props.popularity}
            </div>
            <div className="date">
              <img src={date} alt="" fetchpriority="high" />
              {props.date}
            </div>
          </div>
          <CardButton
            {...props}
            watched={watched}
            toggle={toggle}
            list={props.type === "list"}
          />
        </>
      )}
    </div>
  );
}
