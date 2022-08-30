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
      console.log(payload)
      try {
        const data = await instance.get(`/auth/kakao/callback`)
        console.log(data)
        return thunkAPI.fulfillWithValue(data.response);
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
        console.log(state)
        console.log(action)
      },
      [kakaoLoginThunk.rejected]: (state, action) => {
        
      },
  }
  });
  
  export default kakaoLoginSlice;