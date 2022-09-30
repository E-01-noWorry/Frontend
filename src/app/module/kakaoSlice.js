import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';

const initialState = {
  userKey: '',
  snsId: '',
  nickname: '',
  provider: '',
};

export const kakaoLoginThunk = createAsyncThunk(
  'kakaoUser/login',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/auth/kakao/callback?code=${payload}`);

      localStorage.setItem('accessToken', data.data.user.accessToken);
      localStorage.setItem('refreshToken', data.data.user.refreshToken);
      localStorage.setItem('nickname', data.data.user.nickname);
      localStorage.setItem('userKey', data.data.user.userKey);

      return thunkAPI.fulfillWithValue(data.response);
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
    [kakaoLoginThunk.fulfilled]: (state, action) => {},
    [kakaoLoginThunk.rejected]: (state, action) => {},
  },
});

export default kakaoLoginSlice;
