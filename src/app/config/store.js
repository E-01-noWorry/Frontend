import { configureStore } from '@reduxjs/toolkit';
import select from '../module/selectSlice';
import vote from '../module/voteSlice';
import commentSlice from '../module/commentSlice';
import myPageSlice from '../module/myPageSlice';
import kakaoLoginSlice from '../module/kakaoSlice';

export const store = configureStore({
  reducer: {
    comment: commentSlice.reducer,
    myPageSlice: myPageSlice.reducer,
    select,
    vote,
    kakao: kakaoLoginSlice.reducer,
  },

  devTools: process.env.NODE_ENV !== 'production',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
