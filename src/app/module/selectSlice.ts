import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "app/module/instance";
import { SelectItemProps } from "types";

export const __getSelectAll = createAsyncThunk("/getSelectAll", async (page: number, thunkAPI) => {
  try {
    const { data } = await instance.get(`/select?page=${page}`);
    return thunkAPI.fulfillWithValue(data.result);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.errMsg);
  }
});

export const __getSelectBySearch = createAsyncThunk(
  "/getSelectBySearch",
  async (query: string, thunkAPI) => {
    try {
      const { data } = await instance.get(`/select/search?searchWord=${query}`);
      return thunkAPI.fulfillWithValue({ data: data.result, query });
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.errMsg);
    }
  },
);

export const __getSelectBySelected = createAsyncThunk(
  "/getSelectBySelected",
  async (payload: { value: string; page: number }, thunkAPI) => {
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
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.errMsg);
    }
  },
);

interface State {
  data: SelectItemProps[];
  selected: { [name: string]: string };
  error: null | string;
}

const initialState: State = {
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

  extraReducers: (builder) => {
    builder.addCase(__getSelectAll.fulfilled, (state, action: any) => {
      state.data = [...state.data, ...action.payload];
    });
    builder.addCase(__getSelectAll.rejected, (state, action: any) => {
      state.error = action.payload;
    });

    builder.addCase(__getSelectBySearch.fulfilled, (state, action: any) => {
      state.data = action.payload.data;
      state.selected = { ...initialState.selected, query: action.payload.query };
    });
    builder.addCase(__getSelectBySearch.rejected, (state, action: any) => {
      state.error = action.payload;
    });

    builder.addCase(__getSelectBySelected.fulfilled, (state, action: any) => {
      state.data = [...state.data, ...action.payload];
    });
    builder.addCase(__getSelectBySelected.rejected, (state, action: any) => {
      state.error = action.payload;
    });
  },
});

export const { clearError, clearQuery, clearData, changeSelected } = selectSlice.actions;
export default selectSlice.reducer;
