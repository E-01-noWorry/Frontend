import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
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
      if (data.data.user.nickname) {
        localStorage.setItem('nickname', data.data.user.nickname);
        localStorage.setItem('userKey', data.data.user.userKey);
        localStorage.setItem('refreshToken', data.data.user.refreshToken);
        localStorage.setItem('accessToken', data.data.user.accessToken);
        window.location.replace('/');
      }
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
      state.userKey = action.payload.userKey;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    [kakaoLoginThunk.rejected]: (state, action) => {},
  },
});

export default kakaoLoginSlice;
