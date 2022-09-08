import React, { useState, useEffect, useCallback } from 'react';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';
import instance from './instance';

const initialState = {
  data: [],
};

export const postVotedThunk = createAsyncThunk(
  'mypage/postvoted',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`my/select?page=${payload.page}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const myPageSlice = createSlice({
  name: 'myPage',
  initialState,
  reducers: {},
  extraReducers: {
    [postVotedThunk.fulfilled]: (state, action) => {
      const ab = action.payload.result;
      state.data = ab;
      console.log(current(state));
    },
    [postVotedThunk.rejected]: (state, action) => {},
  },
});

export default myPageSlice;
