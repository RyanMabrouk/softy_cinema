import React, { useContext, useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import postData from "../../Api/postData";
import SearchContext from "../../Context/SearchContext";

export function Stars() {
  const { cardClicked, ratedData, refreshRated } = useContext(SearchContext);
  const [userRating, setUserRating] = useState(
    ratedData?.find((e) => e.id === cardClicked)?.rating
  );
  useEffect(() => {
    async function upadteRating() {
      if (userRating) {
        try {
          const res = await postData(
            {
              value: userRating,
            },
            `/movie/${cardClicked}/rating`
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
        rating={userRating}
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
