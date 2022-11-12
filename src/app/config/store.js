import { configureStore } from "@reduxjs/toolkit";

import select from "app/module/selectSlice";
import room from "app/module/roomSlice";

import commentSlice from "../module/commentSlice";
import kakaoLoginSlice from "../module/kakaoSlice";
import voteSlice from "../module/voteSlice";

export const store = configureStore({
  reducer: {
    select,
    room,

    comment: commentSlice.reducer,
    kakao: kakaoLoginSlice.reducer,
    vote: voteSlice.reducer,
  },

  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
