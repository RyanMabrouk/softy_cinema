import React, { useContext, useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import SearchContext from "../../../../Context/SearchContext";
import UserContext from "../../../../Context/UserContext";
import postData from "../../../../Api/postData";


export function Stars() {
  const { cardClicked, ratedData, refreshRated } = useContext(SearchContext);
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
            console.log("success");
            refreshRated((old) => !old);
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
        starRatedColor="yellow"
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
