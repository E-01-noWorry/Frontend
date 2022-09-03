import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import signUpSlice from '../module/signUpSlice';
import loginSlice from '../module/loginSlice';
import select from '../module/selectSlice';
import vote from '../module/voteSlice';
import commentSlice from '../module/commentSlice';
import room from '../module/roomSlice';

export const store = configureStore({
  reducer: {
    signUp: signUpSlice.reducer,
    login: loginSlice.reducer,
    comment: commentSlice.reducer,
    select,
    vote,
    room,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
