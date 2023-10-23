import React, { useState } from "react";
import Loader from "../Loader";
import { Tooltip } from "antd";

import time from "../../assets/time.svg";
import date from "../../assets/date.svg";
import star from "../../assets/star.svg";
import no_poster from "../../assets/no-poster.png";
import heart from "../../assets/heart.svg";
import delete_icon from "../../assets/delete.svg";
import deleteData from "../../Api/deleteData";
import postData from "../../Api/postData";

export default function Card(props) {
  //---------------------
  const [watched, setWatched] = useState(props.watched);
  if (watched !== props.watched) {
    setWatched(props.watched);
  }
  //---------------------
  const [loading, setLoading] = useState(false);

  async function toggleWatched(action) {
    setLoading(true);
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
      props.refresh(action ? props.id : props.id + "del");
      setLoading(false);
    } else {
      console.error(res.error);
    }
  }
  async function deleteRating() {
    setLoading(true);
    const res = await deleteData(`/movie/${props.id}/rating`);
    if (res.success) {
      props.setRefreshRated((old) => !old);
      setLoading(false);
    } else {
      console.error(res.error);
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
          <div className="poster">
            <label htmlFor={props.id + "poster"}>
              <img src={props.poster ? props.poster : no_poster} alt="" />
              {props.userRating && (
                <>
                  <label htmlFor={props.id + "del_rating"}>
                    {" "}
                    <Tooltip
                      placement="top"
                      title={
                        <span>You Rated This Movie {props.userRating}</span>
                      }
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
              )}
            </label>
            <input
              type="button"
              id={props.id + "poster"}
              onClick={() => {
                props.setCardClicked(props.id);
              }}
            />
          </div>
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
          {props.type !== "favorite" ? (
            <div className="watched_btn">
              <label htmlFor={props.id}>
                {watched ? (
                  <>Watched!</>
                ) : (
                  <>
                    Add Watched
                    <img src={heart} />
                  </>
                )}
              </label>
              <input
                type="button"
                id={props.id}
                onClick={() => toggleWatched(true)}
                disabled={watched}
              />
            </div>
          ) : props.userRating ? null : (
            <div className="watched_btn">
              <label htmlFor={props.id + "del"}>Delete</label>
              <input
                type="button"
                id={props.id + "del"}
                onClick={() => toggleWatched(false)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
