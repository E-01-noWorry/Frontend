import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from './instance';

export const __getDetailSelect = createAsyncThunk(
  '/getDetailSelect',
  async (selectKey, thunkAPI) => {
    try {
      const { data } = await instance.get(`/select/${selectKey}`);
      return thunkAPI.fulfillWithValue(data.result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errMsg);
    }
  },
);

const initialState = {
  select: {},
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
    [__getDetailSelect.fulfilled]: (state, action) => {
      state.select = action.payload;
    },
    [__getDetailSelect.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { cleanUp } = selectSlice.actions;
export default selectSlice.reducer;
