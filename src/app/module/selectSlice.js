import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from './instance';

export const __getScrollSelect = createAsyncThunk(
  '/getScrollSelect',
  async (page, thunkAPI) => {
    try {
      const { data } = await instance.get(`/select?page=${page}`);
      return thunkAPI.fulfillWithValue(data.result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const __getAllSelect = createAsyncThunk(
  '/getAllSelect',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/select');
      return thunkAPI.fulfillWithValue(data.result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const __getDetailSelect = createAsyncThunk(
  '/getDetailSelect',
  async (selectKey, thunkAPI) => {
    try {
      const { data } = await instance.get(`/select/${selectKey}`);
      return thunkAPI.fulfillWithValue(data.result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const __postSelect = createAsyncThunk(
  '/postSelect',
  async (payload, thunkAPI) => {
    try {
      await instance.post('/select', payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const __deleteSelect = createAsyncThunk(
  '/deleteSelect',
  async (selectKey, thunkAPI) => {
    try {
      await instance.delete(`/select/${selectKey}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState = {
  selects: [],
  select: {},
  isLoading: false,
  error: null,
};

const selectSlice = createSlice({
  name: 'selectSlice',
  initialState,
  reducers: {
    cleanUp: (state) => {
      state.select = {};
    },
  },
  extraReducers: {
    //모든 선택게시물 조회
    [__getScrollSelect.pending]: (state) => {
      state.isLoading = true;
    },
    [__getScrollSelect.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.selects = action.payload;
    },
    [__getScrollSelect.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //모든 선택게시물 조회
    [__getAllSelect.pending]: (state) => {
      state.isLoading = true;
    },
    [__getAllSelect.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.selects = action.payload;
    },
    [__getAllSelect.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //선택게시물 상세 조회
    [__getDetailSelect.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDetailSelect.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.select = action.payload;
    },
    [__getDetailSelect.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { cleanUp } = selectSlice.actions;
export default selectSlice.reducer;
