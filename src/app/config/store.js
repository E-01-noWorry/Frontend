import { configureStore } from '@reduxjs/toolkit';

import commentSlice from '../module/commentSlice';
import myPageSlice from '../module/myPageSlice';
import kakaoLoginSlice from '../module/kakaoSlice';
import selectSlice from '../module/selectSlice';
import voteSlice from '../module/voteSlice';

export const store = configureStore({
  reducer: {
    comment: commentSlice.reducer,
    myPageSlice: myPageSlice.reducer,
    kakao: kakaoLoginSlice.reducer,
    select: selectSlice.reducer,
    vote: voteSlice.reducer,
  },

  devTools: process.env.NODE_ENV !== 'production',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
