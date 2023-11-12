import React, { memo, useContext, useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

import Card from "../Card/Card.jsx";
import Swiper from "../../../UI/CustomSwiper.jsx";
import { SearchMessage } from "./SearchMessage";
import { useDispatch, useSelector } from "react-redux";
import { DeleteIcon } from "./DeleteIcon.jsx";
import { ToggleBtn } from "./ToggleBtn.jsx";
import UserContext from "../../../../Context/UserContext.jsx";
import { AddNewPage } from "../../../../Store/dataThunks.js";

const MAX_RESPONSE_LENGTH = 20;
export default memo(function CardSwiper(props) {
  const { sessionId } = useContext(UserContext);
  const favoriteData = useSelector((state) => state.data.favoriteData);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [toggle, setToggle] = useState(
    props.toggle ? props.toggle : props.type !== "list"
  );
  const data = props.data ? [...props.data] : [];
  if (props.sort) {
    data.sort((a, b) => {
      return b[props.sort] - a[props.sort];
    });
  }
  //---------------------------------------------
  function loadNextPage() {
    if (data?.length >= MAX_RESPONSE_LENGTH) {
      setPage((old) => old + 1);
    }
  }
  useEffect(() => {
    if (page > 1) {
      dispatch(
        AddNewPage({
          listId: props.ListId,
          dataIndex: props.dataIndex,
          page: page,
          sessionId: sessionId,
        })
      );
    }
  }, [page]);
  //---------------------------------------------
  function handleToggle() {
    setToggle((old) => !old);
  }
  const slides = data?.map((e) => {
    return (
      <SwiperSlide key={e.id + "/" + props.ListId}>
        <Card
          id={e.id}
          title={e.title}
          poster={
            e.poster_path
              ? "https://image.tmdb.org/t/p/original" + e.poster_path
              : null
          }
          popularity={e.popularity}
          date={e.release_date}
          rating={e.vote_average?.toFixed(1)}
          userRating={e.rating}
          watched={favoriteData?.map((e) => e.id).includes(e.id)}
          type={props.type}
          listId={props.ListId}
        />
      </SwiperSlide>
    );
  });
  return (
    <>
      {data?.length >=  0 && (
        <header>
          <ToggleBtn {...props} toggle={toggle} handleToggle={handleToggle} />
          <h1>{props.name}</h1>
          {props.allowDelete && <DeleteIcon {...props} />}
        </header>
      )}
      {toggle && (
        <section>
          <Swiper
            className={"cards_container"}
            slides={
              slides?.length > 0
                ? slides
                : props.type === "search" && <SearchMessage />
            }
            navigation={true}
            slidesPerView="auto"
            loadNextPage={loadNextPage}
          />
        </section>
      )}
    </>
  );
});
