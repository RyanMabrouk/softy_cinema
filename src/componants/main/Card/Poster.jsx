import { useContext } from "react";
import { Rating } from "./Rating";
import SearchContext from "../../../Context/SearchContext";
import no_poster from "../../../assets/no-poster.png";
import delete_icon from "../../../assets/delete.svg";

export function Poster(props) {
  const { setCardClicked } = useContext(SearchContext);
  return (
    <div className="poster">
      <label htmlFor={props.id + "poster"}>
        <img src={props.poster ? props.poster : no_poster} alt="" />
        {props.userRating && <Rating {...props} setLoading={props.setLoading} />}
      </label>
      <input
        type="button"
        id={props.id + "poster"}
        onClick={() => {
          setCardClicked(props.id);
        }}
      />
    </div>
  );
}
