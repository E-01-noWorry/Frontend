import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

export const __postComment = createAsyncThunk("/postComment", async (payload, thunkAPI) => {
  try {
    const { data } = await instance.post(`/comment/${payload.selectKey}`, {
      comment: payload.comment,
    });
    return thunkAPI.fulfillWithValue(data.result);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errMsg);
  }
});

export const __getComment = createAsyncThunk("/getComment", async (selectKey, thunkAPI) => {
  try {
    const { data } = await instance.get(`/comment/${selectKey}`);
    return thunkAPI.fulfillWithValue(data.result);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errMsg);
  }
});

export const __editComment = createAsyncThunk("/editComment", async (payload, thunkAPI) => {
  try {
    const { data } = await instance.put(`/comment/${payload.commentKey}`, {
      comment: payload.comment,
    });
    console.log(data);
    return thunkAPI.fulfillWithValue(data.result);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errMsg);
  }
});

export const __deleteComment = createAsyncThunk("/deleteComment", async (commentKey, thunkAPI) => {
  try {
    const { data } = await instance.delete(`/comment/${commentKey}`);
    return thunkAPI.fulfillWithValue(data.result);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errMsg);
  }
});

//대댓글
export const writeRecommentThunk = createAsyncThunk(
  "user/writeRecomment",
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
  "user/deleteRecomment",
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
  "user/editRecomment",
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

const initialState = {
  data: [],
  error: null,
};

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {
    clearErrorComment: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [__postComment.fulfilled]: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    [__postComment.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [__getComment.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [__getComment.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [__editComment.fulfilled]: (state, action) => {
      state.data = state.data.map((item) =>
        item.commentKey === action.payload.commentKey ? action.payload : item,
      );
    },
    [__editComment.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [__deleteComment.fulfilled]: (state, action) => {
      state.data = state.data.filter((item) => item.commentKey !== action.payload.commentKey);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.error = action.payload;
    },

    // [editCommentThunk.fulfilled]: (state, action) => {
    //   const a = current(state).data.filter(
    //     (a) => a.commentKey === parseInt(action.payload.data.result.commentKey),
    //   );
    //   const indexNum = current(state).data.indexOf(a[0]);
    //   state.data = state.data.map((item, idx) =>
    //     idx === indexNum ? { ...item, comment: action.payload.data.result.comment } : item,
    //   );
    // },
    // [editCommentThunk.rejected]: (state, action) => {
    //   console.log(action);
    // },

    // [writeRecommentThunk.fulfilled]: (state, action) => {
    //   state.data?.map((a) =>
    //     a.commentKey === parseInt(action.payload.data.result.commentKey)
    //       ? a.recomment?.push(action.payload.data.result)
    //       : a,
    //   );
    // },
    // [writeRecommentThunk.rejected]: (state, action) => {},
    // [deleteRecommentThunk.fulfilled]: (state, action) => {
    //   const a = current(state).data.filter(
    //     (a) => a.commentKey === parseInt(action.payload.data.result.commentKey),
    //   );
    //   const indexNum = current(state).data.indexOf(a[0]);
    //   state.data = state.data.map((item, idx) =>
    //     idx === indexNum
    //       ? {
    //           ...a[0],
    //           recomment: [
    //             ...a[0].recomment?.filter(
    //               (a) => a.recommentKey !== parseInt(action.payload.data.result.recommentKey),
    //             ),
    //           ],
    //         }
    //       : item,
    //   );
    // },

    // [deleteRecommentThunk.rejected]: (state, action) => {},
    // [editRecommentThunk.fulfilled]: (state, action) => {
    //   const a = current(state).data.filter(
    //     (a) => a.commentKey === parseInt(action.payload.data.result.commentKey),
    //   );
    //   const indexNum = current(state).data.indexOf(a[0]);
    //   state.data = state.data.map((item, idx) =>
    //     idx === indexNum
    //       ? {
    //           ...a[0],
    //           recomment: a[0].recomment.map((item) =>
    //             item.recommentKey === parseInt(action.payload.data.result.recommentKey)
    //               ? action.payload.data.result
    //               : item,
    //           ),
    //         }
    //       : item,
    //   );
    // },
    // [editRecommentThunk.rejected]: (state, action) => {},
  },
});

export const { clearErrorComment } = commentSlice.actions;
export default commentSlice.reducer;
