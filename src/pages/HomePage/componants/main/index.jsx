import React from "react";
import Details from "../details";
import CardsSwiper from "./CardsSwiper";
import { useSelector } from "react-redux";
import Loader from "../../../UI/Loader";
import { AddListInput } from "./AddListInput";

export default function Main() {
  const searchData = useSelector((state) => state.data.searchData.data);
  const favoriteData = useSelector((state) => state.data.favoriteData);
  const ratedData = useSelector((state) => state.data.ratedData);
  const listsData = useSelector((state) => state.data.listsData);
  const { id: cardClicked, loading } = useSelector(
    (state) => state.data.cardClicked
  );
  return (
    <main>
      <CardsSwiper
        key={1}
        name={"Movies"}
        data={searchData}
        sort={"popularity"}
        type={"search"}
      />
      <CardsSwiper
        key={2}
        name={"Favorite"}
        data={favoriteData}
        sort={false}
        type={"list"}
        toggle={true}
      />
      <CardsSwiper
        key={3}
        name={"Rated Movies"}
        data={ratedData}
        sort={"rating"}
        type={"list"}
        toggle={true}
      />
      <section className="user_lists">
        {listsData?.map((e, i) => {
          return (
            <CardsSwiper
              key={e.id}
              name={e.name}
              data={e.data.items}
              sort={false}
              type={"list"}
              ListId={e.id}
              allowDelete={true}
            />
          );
        })}
        <AddListInput />
      </section>
      {loading ? (
        <Loader className="details_loader" />
      ) : (
        cardClicked && (
          <Details key={cardClicked} className="details_container" />
        )
      )}
    </main>
  );
}
