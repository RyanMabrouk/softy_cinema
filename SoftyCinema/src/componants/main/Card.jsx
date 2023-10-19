import React, { useState } from "react";
import Loader from "../loader";
import { Tooltip } from "antd";

import time from "../../assets/time.svg";
import date from "../../assets/date.svg";
import star from "../../assets/star.svg";
import no_poster from "../../assets/no-poster.png";
import heart from "../../assets/heart.svg";

import postData from "../Api/postData";

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
    const res = await postData(props.id, action);
    if (res.success) {
      setWatched(action);
      async ()=>{}
      props.refresh(action ? props.id : props.id + "del");
      setLoading(false);
      console.log(props.id, " changed");
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
          ) : (
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
