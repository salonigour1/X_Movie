import { createSlice } from '@reduxjs/toolkit';
import homeSlice from './homeSlice';
import useFetch from '../../useFetch';
// const { data, loading } = useFetch(`/trending/all/${dayOrWeek}`);
const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    trendingDayWise: [],
    trendingWeekWise: [],
    loading: true,
  },
  reducers: {
    getTrendingApiDayWise: (state, action) => {
      state.trendingDayWise = action.payload;
    },
    getTrendingApiWeekWise: (state, action) => {
      state.trendingWeekWise = action.payload;
    },
    getLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { getTrendingApiDayWise, getTrendingApiWeekWise, getLoading } =
  trendingSlice.actions;

export default trendingSlice.reducer;
