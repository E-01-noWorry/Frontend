import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import instance from './instance';

const initialState = {
  data: [],
  point: '',
};

export const editNickNameThunk = createAsyncThunk(
  'mypage/postvoted',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.put(`user/${payload.userKey}`, {
        nickname: payload.nickname,
      });
      localStorage.setItem('nickname', data.data.nickname);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getMyPointThunk = createAsyncThunk(
  'mypage/mypoint',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/my`);
      localStorage.setItem('nickname', data.data.result.nickname);
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
    [editNickNameThunk.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [editNickNameThunk.rejected]: (state, action) => {},
    [getMyPointThunk.fulfilled]: (state, action) => {
      state.point = action.payload.result;
    },
    [getMyPointThunk.rejected]: (state, action) => {},
  },
});
export default myPageSlice;
