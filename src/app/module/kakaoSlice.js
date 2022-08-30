import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";

const initialState = {
    userKey:'',
    snsId:'',
    nickname:'',
    provider:'',
  };  
  
  export const kakaoLoginThunk = createAsyncThunk(
    "kakaoUser/login",
    async (payload, thunkAPI) => {
      try {
        const data = await instance.get(`/auth/kakao/callback?code=${payload}`)
        localStorage.setItem('token', data.user.token)
        return thunkAPI.fulfillWithValue(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const kakaoLoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: {
      [kakaoLoginThunk.fulfilled]: (state, action) => {
      },
      [kakaoLoginThunk.rejected]: (state, action) => {
        
      },
  }
  });
  
  export default kakaoLoginSlice;