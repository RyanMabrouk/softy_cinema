import { useContext, useEffect, useState } from "react";
import { Rating } from "./Rating";
import no_poster from "../../assets/no-poster.png";
import delete_icon from "../../assets/delete.svg";
import SearchContext from "../../../../Context/SearchContext";

export function Poster(props) {
  const { setCardClicked } = useContext(SearchContext);
  const [currentImage, setCurrentImage] = useState(no_poster);
  const [loading, setLoading] = useState(true);
  //blurEffect
  const fetchImage = (src) => {
    const loadingImage = new Image();
    loadingImage.src = src;
    loadingImage.onload = () => {
      setCurrentImage(loadingImage.src);
      setLoading(false);
    };
  };
  useEffect(() => {
    if (props.poster) {
      fetchImage(props.poster);
    }
  }, []);
  return (
    <div className="poster">
      <label htmlFor={props.id + "poster"}>
        <img
          style={{
            filter: `${loading ? "blur(20px)" : ""}`,
            transition: "1s filter linear",
          }}
          src={currentImage}
          alt=""
        />
        {props.userRating && (
          <Rating {...props} setLoading={props.setLoading} />
        )}
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
