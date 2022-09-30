import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

const initialState = {
  accessToken: '',
  refreshToken: '',
  nickname: '',
  userKey: 0,
};

export const kakaoLoginThunk = createAsyncThunk(
  'kakaoUser/login',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/auth/kakao/callback?code=${payload}`);

      return thunkAPI.fulfillWithValue(data.data.user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const kakaoLoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: {
    [kakaoLoginThunk.fulfilled]: (state, action) => {
      state = action.payload;
    },
    [kakaoLoginThunk.rejected]: (state, action) => {},
  },
});

export default kakaoLoginSlice;
