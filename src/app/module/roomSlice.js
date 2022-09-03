import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from './instance';

export const __getAllRoom = createAsyncThunk(
  '/getAllRoom',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/room');
      return thunkAPI.fulfillWithValue(data.result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState = {
  rooms: [],
  error: null,
};

const roomSlice = createSlice({
  name: 'roomSlice',
  initialState,
  reducers: {},
  extraReducers: {
    //모든 고민채팅방 조회
    [__getAllRoom.fulfilled]: (state, action) => {
      state.rooms = action.payload;
    },
    [__getAllRoom.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default roomSlice.reducer;
