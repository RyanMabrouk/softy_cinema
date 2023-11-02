import { createAsyncThunk } from "@reduxjs/toolkit";
import getData from "../Services/getData";
import postData from "../Services/postData";
import deleteData from "../Services/deleteData";

async function fetchData(url, query = null, signal = null) {
  let data = null;
  if (query !== "") {
    try {
      data = await getData(url, signal);
      return data;
    } catch (err) {
      return null;
    }
  }
}
const newQuery = createAsyncThunk(
  "data/newQuery",
  async (query, { signal }) => {
    const searchData = await fetchData(
      `/search/movie?query=${query}&include_adult=false&language=en-US&page=${1}`,
      query,
      signal
    );
    return {
      searchData: searchData,
      query: query,
    };
  }
);
const newCardClicked = createAsyncThunk(
  "data/newCardClicked",
  async (cardClicked) => {
    const movieData = await fetchData(
      `/movie/${String(cardClicked)}?language=en-US`,
      cardClicked
    );
    const recommendationsData = await fetchData(
      `/movie/${String(cardClicked)}/recommendations?language=en-US&page=1`,
      cardClicked
    );
    return {
      id: cardClicked,
      movieData: movieData,
      recommendationsData: recommendationsData,
    };
  }
);
const newSessionData = createAsyncThunk(
  "data/newSessionData",
  async (sessionId) => {
    const favoriteData = await fetchData(
      `/account/20285930/favorite/movies?language=en-US&page=1${
        sessionId !== null ? "&session_id=" + sessionId : ""
      }&sort_by=created_at.asc`
    );
    const ratedData = await fetchData(
      `/account/20285930/rated/movies?language=en-US&page=1${
        sessionId !== null ? "&session_id=" + sessionId : ""
      }&sort_by=created_at.asc`
    );
    const listsData = await fetchData(
      `/account/20285930/lists?page=1&session_id=${
        sessionId !== null ? "&session_id=" + sessionId : ""
      }`
    ).then((lists) => {
      return Promise.all(
        lists.map(async (e) => {
          const data = await fetchData(`/list/${e.id}?language=en-US`);
          return {
            id: e.id,
            name: e.name,
            data: data,
          };
        })
      );
    });
    return {
      favoriteData: favoriteData,
      ratedData: ratedData,
      listsData: listsData,
    };
  }
);
const updateRated = createAsyncThunk("data/updateRated", async (sessionId) => {
  const ratedData = await fetchData(
    `/account/20285930/rated/movies?language=en-US&page=1${
      sessionId !== null ? "&session_id=" + sessionId : ""
    }&sort_by=created_at.asc`
  );
  return { ratedData: ratedData };
});
const upadateFavourite = createAsyncThunk(
  "data/upadateFavourite",
  async (sessionId) => {
    const favoriteData = await fetchData(
      `/account/20285930/favorite/movies?language=en-US&page=1${
        sessionId !== null ? "&session_id=" + sessionId : ""
      }&sort_by=created_at.asc`
    );
    return {
      favoriteData: favoriteData,
    };
  }
);

const createList = createAsyncThunk(
  "data/createList",
  async ({ name, sessionId }) => {
    const API_PAYLOAD = {
      name: name,
      description: "Just an awesome list dawg.",
      language: "en",
    };
    const res = await postData(API_PAYLOAD, `/list?session_id=${sessionId}`);
    if (res?.success) {
      console.log("list created");
      return {
        id: res.list_id,
        name: name,
        data: [],
      };
    }
  }
);
const deleteList = createAsyncThunk(
  "data/deleteList",
  async ({ id, sessionId }) => {
    const res = await deleteData(`/list/${id}?session_id=${sessionId}`);
    if (res?.success) {
      console.log("list deleted");
      return id;
    }
  }
);
const updateList = createAsyncThunk(
  "data/updateList",
  async ({ listId, movieId, action, sessionId }) => {
    const API_PAYLOAD = {
      media_id: movieId,
    };
    const ACTION = action === "delete" ? "remove_item" : "add_item";
    const res = await postData(
      API_PAYLOAD,
      `/list/${listId}/${ACTION}?session_id=${sessionId}`
    );
    if (res?.success) {
      console.log("list updated");
      const data = await fetchData(`/list/${listId}?language=en-US`);
      return {
        id: listId,
        name: data.name,
        data: data,
      };
    }
  }
);
export {
  newCardClicked,
  newQuery,
  newSessionData,
  upadateFavourite,
  updateRated,
  createList,
  deleteList,
  updateList,
};
