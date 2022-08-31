import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
import { current } from "@reduxjs/toolkit";

const initialState = {
  signUpInfo: [],
  isLoading: false,
  error: [],
};

export const signUpThunk = createAsyncThunk(
  "user/signup",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post("/user/signup", payload);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: {
    [signUpThunk.fulfilled]: (state, action) => {
      state.error = action.payload
    },
    [signUpThunk.rejected]: (state, action) => {
     state.error = action.payload
    },
  },
});

export default signUpSlice;