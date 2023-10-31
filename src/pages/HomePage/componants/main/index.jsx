import React, { useContext, useRef } from "react";
import Details from "../details";
import CardsSwiper from "./CardsSwiper";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../UI/Loader";
import UserContext from "../../../../Context/UserContext";
import { createList } from "../../../../Store/dataThunks";

export default function Main() {
  const dispatch = useDispatch();
  const { sessionId } = useContext(UserContext);
  const searchData = useSelector((state) => state.data.searchData.data);
  const favoriteData = useSelector((state) => state.data.favoriteData);
  const ratedData = useSelector((state) => state.data.ratedData);
  const listsData = useSelector((state) => state.data.listsData);
  const { id: cardClicked, loading } = useSelector(
    (state) => state.data.cardClicked
  );
  const newlist = useRef(null);
  function addNewList() {
    if (newlist.current.value) {
      dispatch(
        createList({ name: newlist.current.value, sessionId: sessionId })
      );
      newlist.current.value = "";
    }
  }
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
      />
      <CardsSwiper
        key={3}
        name={"Rated Movies"}
        data={ratedData}
        sort={"rating"}
        type={"list"}
      />
      {listsData?.map((e, i) => {
        return (
          <CardsSwiper
            key={i + 3}
            ListId={e.id}
            name={e.name}
            data={e.data.items}
            sort={false}
            type={"list"}
            allowDelete={true}
          />
        );
      })}
      <div>
        <label htmlFor="addlist">
          <h1 className="toggle">+</h1>
        </label>
        <input type="button" id="addlist" onClick={addNewList} />
        <input
          type="text"
          className="add_list"
          placeholder="Add a list"
          ref={newlist}
        />
      </div>

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
