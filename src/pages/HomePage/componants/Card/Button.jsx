import React from "react";
import heart from "../../assets/heart.svg";

export function Button(props) {
  return (
    <>
      {props.userRating ? null : props.list ? (
        <div className="watched_btn">
          <label htmlFor={props.id + "del"}>Delete</label>
          <input
            type="button"
            id={props.id + "del"}
            onClick={() => props.toggleWatched(false)}
          />
        </div>
      ) : (
        <div className="watched_btn">
          <label htmlFor={props.id}>
            {props.watched ? (
              "Favorite!"
            ) : (
              <>
                Add Favorite
                <img src={heart} />
              </>
            )}
          </label>
          <input
            type="button"
            id={props.id}
            onClick={() => props.toggleWatched(true)}
            disabled={props.watched}
          />
        </div>
      )}
    </>
  );
}
