import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from './instance';

export const __postVote = createAsyncThunk(
  '/postVote',
  async (payload, thunkAPI) => {
    try {
      await instance.post(`/select/vote/${payload.selectKey}`, {
        choice: payload.isSelect,
      });
      const { data } = await instance.get(`/select/vote/${payload.selectKey}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const __getVoteResult = createAsyncThunk(
  '/getVoteResult',
  async (selectKey, thunkAPI) => {
    try {
      const { data } = await instance.get(`/select/vote/${selectKey}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errMsg);
    }
  },
);

const initialState = {
  voteResult: {},
  msg: '',
  isLoading: false,
  error: null,
};

const voteSlice = createSlice({
  name: 'voteSlice',
  initialState,
  reducers: {
    cleanUpVote: (state) => {
      state = { ...state, initialState };
    },
  },
  extraReducers: {
    //투표 하기
    [__postVote.pending]: (state) => {
      state.isLoading = true;
    },
    [__postVote.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.msg = action.payload.msg;
      state.voteResult = action.payload.result;
    },
    [__postVote.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //투표 결과 조회
    [__getVoteResult.pending]: (state) => {
      state.isLoading = true;
    },
    [__getVoteResult.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.msg = action.payload.msg;
      state.voteResult = action.payload.result;
    },
    [__getVoteResult.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { cleanUpVote } = voteSlice.actions;
export default voteSlice.reducer;
