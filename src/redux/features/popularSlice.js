import { createSlice } from '@reduxjs/toolkit';

const popularSlice = createSlice({
  name: 'popular',
  initialState: {
    popularSeries: [],
    popularMovies: [],
    popularLoading: true,
  },
  reducers: {
    getPopularSeries: (state, action) => {
      state.popularSeries = action.payload;
    },
    getPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    getPopularLoading: (state, action) => {
      state.popularLoading = action.payload;
    },
  },
});
export const { getPopularSeries, getPopularMovies, getPopularLoading } =
  popularSlice.actions;

export default popularSlice.reducer;
