import { createSlice } from "@reduxjs/toolkit";
import {
  newCardClicked,
  newQuery,
  newSessionData,
  upadateFavourite,
  updateRated,
  createList,
  deleteList,
  updateList,
  AddNewPage,
} from "./dataThunks";

const initialState = {
  //-------Main--------
  query: "",
  searchData: { data: null, loading: false },
  favoriteData: null,
  ratedData: null,
  listsData: null,
  //------Details--------
  cardClicked: {
    id: "",
    movieData: null,
    recommendationsData: null,
    loading: false,
  },
};
const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    clearSession(state) {
      state.query = "";
      state.searchData = { data: null, loading: false };
      state.favoriteData = null;
      state.ratedData = null;
      state.listsData = null;
      state.cardClicked = {
        id: "",
        movieData: null,
        recommendationsData: null,
        loading: false,
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(newQuery.pending, (state) => {
        state.searchData.loading = true;
      })
      .addCase(newQuery.fulfilled, (state, { payload }) => {
        state.searchData = { data: payload.searchData, loading: false };
        state.query = payload.query;
      })
      //----------------------------------------
      .addCase(newCardClicked.pending, (state) => {
        state.cardClicked.loading = true;
      })
      .addCase(newCardClicked.fulfilled, (state, { payload }) => {
        state.cardClicked = { ...payload, loading: false };
      })
      //----------------------------------------
      .addCase(newSessionData.fulfilled, (state, { payload }) => {
        state.favoriteData = payload.favoriteData;
        state.ratedData = payload.ratedData;
        state.listsData = payload.listsData;
      })
      //--------------------------------------
      .addCase(updateRated.fulfilled, (state, { payload }) => {
        state.ratedData = payload.ratedData;
      })
      //-------------------------------------
      .addCase(upadateFavourite.pending, (state) => {
        state.searchData.loading = true;
      })
      .addCase(upadateFavourite.fulfilled, (state, { payload }) => {
        state.favoriteData = payload.favoriteData;
      })
      //----------------------------------------
      .addCase(createList.fulfilled, (state, { payload }) => {
        if (payload) {
          state.listsData.push(payload);
        }
      })
      //----------------------------------------
      .addCase(deleteList.fulfilled, (state, { payload }) => {
        if (payload) {
          state.listsData = state.listsData.filter((e) => e.id !== payload);
        }
      })
      //-----------------------------------------
      .addCase(updateList.fulfilled, (state, { payload }) => {
        if (payload) {
          const index = state.listsData.findIndex((e) => e.id === payload.id);
          state.listsData[index] = payload;
        }
      })
      //-----------------------------------------
      .addCase(AddNewPage.fulfilled, (state, { payload }) => {
        if (payload) {
          console.log("payload =");
          console.log(payload);
          if (payload.listId) {
            const index = state.listsData.findIndex(
              (e) => e.id === payload.listId
            );
            state.listsData[index].data.items = [
              ...state.listsData[index].data.items,
              ...payload.data,
            ];
          } else {
            payload.dataIndex === "searchData"
              ? (state[payload.dataIndex].data = [
                  ...state[payload.dataIndex].data,
                  ...payload.data,
                ])
              : (state[payload.dataIndex] = [
                  ...state[payload.dataIndex],
                  ...payload.data,
                ]);
          }
        }
      }),
});

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
export const { clearSession } = dataSlice.actions;
export default dataSlice.reducer;
