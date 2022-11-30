import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "app/module/instance";

export const __getRoomAll = createAsyncThunk("/getRoomAll", async (page, thunkAPI) => {
  try {
    const { data } = await instance.get(`/room?page=${page}`);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errMsg);
  }
});

export const __getRoomBySearch = createAsyncThunk("/getRoomBySearch", async (query, thunkAPI) => {
  try {
    const { data } = await instance.get(`/room/search?searchWord=${query}`);
    return thunkAPI.fulfillWithValue({ data: data.result, query });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errMsg);
  }
});

const initialState = {
  data: {
    all: [],
    entered: [],
  },
  query: "",
  error: null,
};

const roomSlice = createSlice({
  name: "roomSlice",
  initialState,
  reducers: {
    clearErrorRoom: (state) => {
      state.error = null;
    },

    clearQueryRoom: (state) => {
      state.data.all = [];
      state.query = "";
    },

    clearDataRoom: (state) => {
      state.data.all = [];
    },
  },
  extraReducers: {
    [__getRoomAll.fulfilled]: (state, action) => {
      state.data.all = [...state.data.all, ...action.payload.result];
      state.data.entered = action.payload.isRoom;
    },
    [__getRoomAll.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [__getRoomBySearch.fulfilled]: (state, action) => {
      state.data.all = action.payload.data;
      state.query = action.payload.query;
    },
    [__getRoomBySearch.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { clearErrorRoom, clearQueryRoom, clearDataRoom } = roomSlice.actions;
export default roomSlice.reducer;
