import { configureStore } from "@reduxjs/toolkit";

import select from "app/module/selectSlice";
import room from "app/module/roomSlice";
import comment from "app/module/commentSlice";

import kakaoLoginSlice from "../module/kakaoSlice";

export const store = configureStore({
  reducer: {
    select,
    room,
    comment,

    kakao: kakaoLoginSlice.reducer,
  },

  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
