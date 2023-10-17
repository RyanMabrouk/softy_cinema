import React from "react";
import time from "../../assets/time.svg";
import date from "../../assets/date.svg";
import star from "../../assets/star.svg";
import no_poster from "../../assets/no-poster.png";

export default function Card(props) {
  return (
    <div className="card_container">
      <div className="title_rating_container">
        <div className="title">{props.title}</div>
        <div className="rating">
          <img src={star} alt="" />
          {props.rating}
        </div>
      </div>
      <div className="poster">
        <img  src={props.poster?props.poster:no_poster} alt="" />
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
    </div>
  );
}
