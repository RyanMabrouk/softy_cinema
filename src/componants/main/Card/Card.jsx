import React, { useContext, useState } from "react";
import Loader from "../../Loader";
import { Tooltip } from "antd";

import time from "../../../assets/time.svg";
import date from "../../../assets/date.svg";
import star from "../../../assets/star.svg";
import postData from "../../../Api/postData";
import SearchContext from "../../../Context/SearchContext";
import { Button } from "./Button";
import { Poster } from "./Poster";

export default function Card(props) {
  const { refreshSearch, refreshFavorite, favoriteData } =
    useContext(SearchContext);
  const [watched, setWatched] = useState(props.watched);
  const [loading, setLoading] = useState(false);
  if (watched !== props.watched) {
    setWatched(props.watched);
  }
  async function toggleWatched(action) {
    setLoading(true);
    try {
      const res = await postData(
        {
          media_type: "movie",
          media_id: props.id,
          favorite: action,
        },
        "/account/20285930/favorite"
      );
      if (res.success) {
        setWatched(action);
        refreshSearch((old) => !old);
        refreshFavorite((old) => !old);
      }
    } catch (err) {
      console.error(err);
      console.log("Failed Action");
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
              <img src={star} alt="" />
              {props.rating}
            </div>
          </div>
          <Poster {...props} setLoading={setLoading} />
          <div className="time_date_container">
            <div className="time">
              <img src={time} alt="" />
              {props.time}
            </div>
            <div className="date">
              <img src={date} alt="" />
              {props.date}
            </div>
          </div>
          <Button
            {...props}
            watched={watched}
            toggleWatched={toggleWatched}
            list={props.type === "list"}
          />
        </>
      )}
    </div>
  );
}
