import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from './instance';
import { current } from '@reduxjs/toolkit';
import reset from 'styled-reset';

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
      const data = await instance.get(
        `/comment/${payload.params.selectKey}?page=${payload.page}`,
      );

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

//대댓글
export const writeRecommentThunk = createAsyncThunk(
  'user/writeRecomment',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post(`/recomment/${payload.commentKey}`, {
        comment: payload.comment,
      });

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteRecommentThunk = createAsyncThunk(
  'user/deleteRecomment',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.delete(`/recomment/${payload.recommentKey}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const editRecommentThunk = createAsyncThunk(
  'user/editRecomment',
  async (payload, thunkAPI) => {
    try {
      const data = await instance.put(`/recomment/${payload.recommentKey}`, {
        comment: payload.recomment,
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
      state.data.push({ ...action.payload?.result, recomment: [] });
    },
    [writeCommentThunk.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getCommentThunk.fulfilled]: (state, action) => {
      state.data = state.data.concat(action.payload.data.result);
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
      const a = current(state).data.filter(
        (a) => a.commentKey === action.payload.data.result.commentKey,
      );

      const indexNum = current(state).data.indexOf(a[0]);

      state.data = state.data.map((item, idx) =>
        idx === indexNum
          ? { ...item, comment: action.payload.data.result.comment }
          : item,
      );
      console.log(action.payload.data);
      console.log(current(state));
    },
    [editCommentThunk.rejected]: (state, action) => {
      console.log(action);
    },
    [writeRecommentThunk.fulfilled]: (state, action) => {
      state.data?.map((a) =>
        a.commentKey === action.payload.data.result.commentKey
          ? a.recomment?.push(action.payload.data.result)
          : a,
      );
    },
    [writeRecommentThunk.rejected]: (state, action) => {},
    [deleteRecommentThunk.fulfilled]: (state, action) => {
      const a = current(state).data.filter(
        (a) => a.commentKey === action.payload.data.result.commentKey,
      );

      const indexNum = current(state).data.indexOf(a[0]);

      state.data = state.data.map((item, idx) =>
        idx === indexNum
          ? {
              ...a[0],
              recomment: [
                ...a[0].recomment?.filter(
                  (a) =>
                    a.recommentKey !== action.payload.data.result.recommentKey,
                ),
              ],
            }
          : item,
      );
    },
    [deleteRecommentThunk.rejected]: (state, action) => {},

    [editRecommentThunk.fulfilled]: (state, action) => {
      const a = current(state).data.filter(
        (a) => a.commentKey === action.payload.data.result.commentKey,
      );

      const indexNum = current(state).data.indexOf(a[0]);

      state.data = state.data.map((item, idx) =>
        idx === indexNum
          ? {
              ...a[0],
              recomment: a[0].recomment.map((item) =>
                item.recommentKey === action.payload.data.result.recommentKey
                  ? action.payload.data.result
                  : item,
              ),
            }
          : item,
      );
    },
    [editRecommentThunk.rejected]: (state, action) => {},
  },
});

export default commentSlice;
