import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

import instance from './instance';

const initialState = {
  data: [],
  point: '',
  err: null,
};

export const editNickNameThunk = createAsyncThunk(
  'mypage/postvoted',
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await instance.put(`user/nickname`, {
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

export const deleteInfoThunk = createAsyncThunk(
  'mypage/deleteInfo',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.delete(`/user/del`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const myPageSlice = createSlice({
  name: 'myPage',
  initialState,
  reducers: {
    cleanUpErr: (state) => {
      state.err = null;
    },
  },
  extraReducers: {
    [editNickNameThunk.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [editNickNameThunk.rejected]: (state, action) => {
      state.err = action.payload.errMsg;
    },
    [getMyPointThunk.fulfilled]: (state, action) => {
      state.point = action.payload.result;
    },
    [getMyPointThunk.rejected]: (state, action) => {},
    [deleteInfoThunk.fulfilled]: (state, action) => {},
    [deleteInfoThunk.rejected]: (state, action) => {},
  },
});

export const { cleanUpErr } = myPageSlice.actions;
export default myPageSlice;
