import React from "react";
import heart from "../../assets/heart.svg";

export function Button(props) {
  if (props.userRating) return null;
  if (props.list) {
    return (
      <div className="watched_btn">
        <label htmlFor={props.id + "del" + props.listId}>Delete</label>
        <input
          type="button"
          id={props.id + "del" + props.listId}
          onClick={() => props.toggle(false)}
        />
      </div>
    );
  } else {
    return (
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
          onClick={() => props.toggle(true)}
          disabled={props.watched}
        />
      </div>
    );
  }
}
