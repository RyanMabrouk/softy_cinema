// import Swiper core and required modules
import React from "react";
import { Pagination, Navigation, Virtual } from "swiper/modules";
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function CustomSwiper(props) {
  return (
    <div
      className={props.className}
      onChange={props.onChange ? props.onChange : null}
    >
      <Swiper
        // install Swiper modules
        modules={[Virtual, Pagination, Navigation]}
        spaceBetween={props.spaceBetween ? props.spaceBetween : 35}
        slidesPerView={props.slidesPerView ? props.slidesPerView : 1}
        centeredSlides={props.centeredSlides}
        initialSlide={props.initialSlide ? props.initialSlide : 0} //virtual
        loop={props.loop}
        navigation={props.navigation}
        pagination={props.pagination ? { clickable: true } : false}
        onSwiper={(swiper) => {
          swiper.updateSize();
          swiper.update();
        }}
        onSlideChange={props.onSlideChange}
        breakpoints={props.breakpoints}
        allowTouchMove={props.allowTouchMove}
        //centeredSlidesBounds={true}
        observer={true}
        onReachEnd={() => {
          props.loadNextPage ? props.loadNextPage() : null;
        }}
      >
        {props.slides}
      </Swiper>
    </div>
  );
}
