import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
import { current } from "@reduxjs/toolkit";

const initialState = {
  userLogin: [],
  isLoading: false,
  error: [],
};

export const loginThunk = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post("/user/login", payload);
      console.log(data)
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("nickname", data.data.nickname);
      localStorage.setItem("userKey", data.data.userKey);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [loginThunk.fulfilled]: (state, action) => {
      state.userLogin = action.payload
    },
    [loginThunk.rejected]: (state, action) => {
      state.error = action.payload
    },
}
});

export default loginSlice
