import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';
import { current } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  error: null,
};

export const writeCommentThunk = createAsyncThunk(
  'user/writeComment',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post(`/comment/${payload.selectKey}`, {
        comment: payload.comment,
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getCommentThunk = createAsyncThunk(
  'user/getComment',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.get(`/comment/${payload.selectKey}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteCommentThunk = createAsyncThunk(
  'user/deleteComment',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.delete(`/comment/${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const editCommentThunk = createAsyncThunk(
  'user/editComment',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.put(`/comment/${payload.commentKey}`, {
        comment: payload.comment,
      });
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const commentSlice = createSlice({
  name: 'Comment',
  initialState,
  reducers: {},
  extraReducers: {
    [writeCommentThunk.fulfilled]: (state, action) => {
      state.data.push(action.payload?.result);
    },
    [writeCommentThunk.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getCommentThunk.fulfilled]: (state, action) => {
      state.data = action.payload.data?.result;
    },
    [getCommentThunk.rejected]: (state, action) => {
      console.log(action);
    },
    [deleteCommentThunk.fulfilled]: (state, action) => {
      state.data = state.data.filter(
        (a) => a.commentKey !== action.payload.data.result.commentKey,
      );
    },
    [deleteCommentThunk.rejected]: (state, action) => {
      console.log(action);
    },
    [editCommentThunk.fulfilled]: (state, action) => {
      state.data = state.data.map((a) =>
        a.commentKey === action.payload.data.result.commentKey
          ? action.payload.data.result
          : a,
      );
    },
    [editCommentThunk.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export default commentSlice;
