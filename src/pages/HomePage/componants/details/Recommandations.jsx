import React from "react";
import { SwiperSlide } from "swiper/react";
import Swiper from "../../../UI/CustomSwiper";

import no_poster from "../../assets/no-poster.png";
import { useDispatch, useSelector } from "react-redux";
import { newCardClicked } from "../../../../Store/dataSlice";

export default function Recommandations() {
  const recommendationsData = useSelector(
    (state) => state.data.cardClicked.recommendationsData
  );
  const dispatch = useDispatch();
  const recommendationsSlides = recommendationsData?.map((e) => {
    return (
      <SwiperSlide key={e.id + "rec"}>
        <label className="recommandations" htmlFor={e.id + "recommanded"}>
          <img
            src={
              e.poster_path
                ? "https://image.tmdb.org/t/p/original" + e.poster_path
                : no_poster
            }
            alt=""
          />
          <p>{e.title}</p>
        </label>
        <input
          type="button"
          id={e.id + "recommanded"}
          onClick={() => {
            dispatch(newCardClicked(e.id));
          }}
        />
      </SwiperSlide>
    );
  });
  return (
    <>
      {recommendationsData?.length > 0 && (
        <div className="recommandations_container">
          Recommandations
          <br />
          <Swiper
            slides={recommendationsSlides}
            navigation={true}
            slidesPerView="auto"
            spaceBetween="10"
          />
        </div>
      )}
    </>
  );
}
