import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "app/module/instance";

export const __getSelectAll = createAsyncThunk("/getSelectAll", async (page, thunkAPI) => {
  try {
    const { data } = await instance.get(`/select?page=${page}`);
    return thunkAPI.fulfillWithValue(data.result);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errMsg);
  }
});

export const __getSelectBySearch = createAsyncThunk(
  "/getSelectBySearch",
  async (query, thunkAPI) => {
    try {
      const { data } = await instance.get(`/select/search?searchWord=${query}`);
      return thunkAPI.fulfillWithValue({ data: data.result, query });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errMsg);
    }
  },
);

export const __getSelectBySelected = createAsyncThunk(
  "/getSelectBySelected",
  async (payload, thunkAPI) => {
    try {
      if (payload.value === "인기순") {
        const { data } = await instance.get(`/select/filter?page=${payload.page}`);
        return thunkAPI.fulfillWithValue(data.data);
      } else if (payload.value === "진행중인 투표") {
        const { data } = await instance.get(`/select/ongoing?page=${payload.page}`);
        return thunkAPI.fulfillWithValue(data.result);
      } else {
        const { data } = await instance.get(
          `/select/category/${payload.value}?page=${payload.page}`,
        );
        return thunkAPI.fulfillWithValue(data.result);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errMsg);
    }
  },
);

const initialState = {
  data: [],
  selected: {
    query: "",
    filter: "기본순",
    category: "카테고리",
    proceeding: "모든 투표",
  },
  error: null,
};

const selectSlice = createSlice({
  name: "selectSlice",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    clearQuery: (state) => {
      state.data = [];
      state.selected.query = "";
    },

    clearData: (state) => {
      state.data = [];
    },

    changeSelected: (state, action) => {
      state.data = [];
      state.selected = { ...initialState.selected, [action.payload.value]: action.payload.item };
    },
  },
  extraReducers: {
    [__getSelectAll.fulfilled]: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    [__getSelectAll.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [__getSelectBySearch.fulfilled]: (state, action) => {
      state.data = action.payload.data;
      state.selected = { ...initialState.selected, query: action.payload.query };
    },
    [__getSelectBySearch.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [__getSelectBySelected.fulfilled]: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    [__getSelectBySelected.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { clearError, clearQuery, clearData, changeSelected } = selectSlice.actions;
export default selectSlice.reducer;
