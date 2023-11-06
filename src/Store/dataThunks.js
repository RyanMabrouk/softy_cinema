import { createAsyncThunk } from "@reduxjs/toolkit";
import getData from "../Services/getData";
import postData from "../Services/postData";
import deleteData from "../Services/deleteData";

const MAX_RESULT_LENGTH = 20;
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
async function loadAllFavorite(sessionId) {
  let counter = 1;
  let favoriteData = [];
  while (true) {
    let data = await fetchData(
      `/account/20285930/favorite/movies?language=en-US&page=${counter}${
        sessionId !== null ? "&session_id=" + sessionId : ""
      }&sort_by=created_at.asc`
    );
    if (data?.length > 0) {
      favoriteData = [...favoriteData, ...data];
      if (data?.length === MAX_RESULT_LENGTH) {
        counter++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  return favoriteData;
}
async function loadAllRated(sessionId) {
  let counter = 1;
  let ratedData = [];
  while (true) {
    let data = await fetchData(
      `/account/20285930/rated/movies?language=en-US&page=${counter}${
        sessionId !== null ? "&session_id=" + sessionId : ""
      }&sort_by=created_at.asc`
    );
    if (data?.length > 0) {
      ratedData = [...ratedData, ...data];
      if (data?.length === MAX_RESULT_LENGTH) {
        counter++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  return ratedData;
}
//---------------------------GET----------------------------
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
    const favoriteData = await loadAllFavorite(sessionId);
    const ratedData = await loadAllRated(sessionId);
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
const AddNewPage = createAsyncThunk(
  "data/AddNewPage",
  async ({ listId, dataIndex, page, sessionId }, { getState, signal }) => {
    if (listId) {
      const res = await fetchData(
        `/list/${listId}?language=en-US&page=${page}`
      );
      if (res?.items.length > 0) {
        console.log(res.items);
        return {
          listId: listId,
          data: res.items,
        };
      } else {
        return null;
      }
    } else {
      const response = async () => {
        switch (dataIndex) {
          case "ratedData":
            return await fetchData(
              `/account/20285930/rated/movies?language=en-US&page=${page}${
                sessionId !== null ? "&session_id=" + sessionId : ""
              }&sort_by=created_at.asc`
            );
          case "favoriteData":
            return await fetchData(
              `/account/20285930/favorite/movies?language=en-US&page=${page}${
                sessionId !== null ? "&session_id=" + sessionId : ""
              }&sort_by=created_at.asc`
            );
          case "searchData":
            const query = getState().data.query;
            return await fetchData(
              `/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
              query,
              signal
            );
          default:
            null;
        }
      };
      const data = await response();
      if (data?.length > 0) {
        console.log(data);
        return {
          dataIndex: dataIndex,
          data: data,
        };
      } else {
        return null;
      }
    }
  }
);
//--------------------------DELETE-------------------------------------
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
//-----------------------------UPDATE----------------------------------
const updateRated = createAsyncThunk("data/updateRated", async (sessionId) => {
  const ratedData = await loadAllRated(sessionId);
  return { ratedData: ratedData };
});
const upadateFavourite = createAsyncThunk(
  "data/upadateFavourite",
  async (sessionId) => {
    const favoriteData = await loadAllFavorite(sessionId);
    return {
      favoriteData: favoriteData,
    };
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
  AddNewPage,
};
