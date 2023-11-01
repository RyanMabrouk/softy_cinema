import React, { useContext, useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import UserContext from "../../../../Context/UserContext";
import postData from "../../../../Services/postData";
import { useDispatch, useSelector } from "react-redux";
import { updateRated } from "../../../../Store/dataSlice";

export function Stars() {
  const cardClicked = useSelector((state) => state.data.cardClicked.id);
  const ratedData = useSelector((state) => state.data.ratedData);
  const dispatch = useDispatch();

  const { sessionId } = useContext(UserContext);
  const [userRating, setUserRating] = useState(null);
  useEffect(() => {
    async function upadteRating() {
      if (userRating) {
        try {
          const res = await postData(
            {
              value: userRating,
            },
            `/movie/${cardClicked}/rating`,
            sessionId
          );
          if (res.success) {
            setTimeout(() => dispatch(updateRated(sessionId)), 1000);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
    upadteRating();
  }, [userRating]);

  return (
    <div card="user_rating">
      <StarRatings
        rating={
          userRating || ratedData?.find((e) => e.id === cardClicked)?.rating
        }
        starRatedColor="violet"
        starHoverColor="yellow"
        changeRating={setUserRating}
        numberOfStars={10}
        name="rating"
        starDimension="15px"
        starSpacing="1px"
      />
    </div>
  );
}
