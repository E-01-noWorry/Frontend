import { configureStore } from '@reduxjs/toolkit';
import signUpSlice from '../module/signUpSlice';
import loginSlice from '../module/loginSlice';
import select from '../module/selectSlice';
import vote from '../module/voteSlice';
import commentSlice from '../module/commentSlice';
import myPageSlice from '../module/myPageSlice';

export const store = configureStore({
  reducer: {
    signUp: signUpSlice.reducer,
    login: loginSlice.reducer,
    comment: commentSlice.reducer,
    myPageSlice: myPageSlice.reducer,
    select,
    vote,
  },

  devTools: process.env.NODE_ENV !== 'production',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
