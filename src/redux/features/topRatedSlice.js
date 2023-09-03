import { createSlice } from '@reduxjs/toolkit';

const topRatedSlice = createSlice({
  name: 'topRated',
  initialState: {
    topRatedMovies: [],
    topRatedSeries: [],
    topRatedLoading: [],
  },
  reducers: {
    getTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    getTopRatedSeries: (state, action) => {
      state.topRatedSeries = action.payload;
    },
    getTopRatedLoading: (state, action) => {
      state.topRatedLoading = action.payload;
    },
  },
});
export const { getTopRatedLoading, getTopRatedMovies, getTopRatedSeries } =
  topRatedSlice.actions;
export default topRatedSlice.reducer;
