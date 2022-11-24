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

export const __postRecomment = createAsyncThunk("/postRecomment", async (payload, thunkAPI) => {
  try {
    const { data } = await instance.post(`/recomment/${payload.commentKey}`, {
      comment: payload.comment,
    });
    return thunkAPI.fulfillWithValue(data.result);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errMsg);
  }
});

export const __editRecomment = createAsyncThunk("/editRecomment", async (payload, thunkAPI) => {
  try {
    const { data } = await instance.put(`/recomment/${payload.recommentKey}`, {
      comment: payload.comment,
    });
    console.log(data);
    return thunkAPI.fulfillWithValue(data.result);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errMsg);
  }
});

export const __deleteRecomment = createAsyncThunk(
  "/deleteRecomment",
  async (recommentKey, thunkAPI) => {
    try {
      const { data } = await instance.delete(`/recomment/${recommentKey}`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errMsg);
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
    //댓글 POST
    [__postComment.fulfilled]: (state, action) => {
      state.data = [...state.data, { ...action.payload, recomment: [] }];
    },
    [__postComment.rejected]: (state, action) => {
      state.error = action.payload;
    },

    //댓글 GET
    [__getComment.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [__getComment.rejected]: (state, action) => {
      state.error = action.payload;
    },

    //댓글 PATCH
    [__editComment.fulfilled]: (state, action) => {
      state.data = state.data.map((item) =>
        item.commentKey === action.payload.commentKey ? action.payload : item,
      );
    },
    [__editComment.rejected]: (state, action) => {
      state.error = action.payload;
    },

    //댓글 DELETE
    [__deleteComment.fulfilled]: (state, action) => {
      state.data = state.data.filter((item) => item.commentKey !== action.payload.commentKey);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.error = action.payload;
    },

    //대댓글 POST
    [__postRecomment.fulfilled]: (state, action) => {
      state.data = state.data.map((item) =>
        item.commentKey === Number(action.payload.commentKey)
          ? { ...item, recomment: [...item.recomment, action.payload] }
          : item,
      );
    },
    [__postRecomment.rejected]: (state, action) => {
      state.error = action.payload;
    },

    //대댓글 PATCH
    [__editRecomment.fulfilled]: (state, action) => {
      state.data = state.data.map((item) =>
        item.commentKey === Number(action.payload.commentKey)
          ? {
              ...item,
              recomment: item.recomment.map((value) =>
                value.recommentKey === Number(action.payload.recommentKey) ? action.payload : value,
              ),
            }
          : item,
      );
    },
    [__editRecomment.rejected]: (state, action) => {
      state.error = action.payload;
    },

    //대댓글 DELETE
    [__deleteRecomment.fulfilled]: (state, action) => {
      state.data = state.data.map((item) =>
        item.commentKey === Number(action.payload.commentKey)
          ? {
              ...item,
              recomment: item.recomment.filter(
                (value) => value.recommentKey !== Number(action.payload.recommentKey),
              ),
            }
          : item,
      );
    },
    [__deleteRecomment.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { clearErrorComment } = commentSlice.actions;
export default commentSlice.reducer;
