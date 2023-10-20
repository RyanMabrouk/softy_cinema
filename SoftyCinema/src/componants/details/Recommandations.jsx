import React, { useEffect, useState } from "react";
import fetchData from "../../Api/fetchData";
import { SwiperSlide } from "swiper/react";
import Swiper from "../CustomSwiper";

import no_poster from "../../assets/no-poster.png";


export default function Recommandations(props) {
  const [recommendationsData, setRecommendationsData] = useState(null);
  useEffect(() => {
    async function getData() {
      setRecommendationsData(
        await fetchData(
          `/movie/${String(props.id)}/recommendations?language=en-US&page=1`
        )
      );
    }
    getData();
  }, []);
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
            props.setCardClicked(e.id);
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
