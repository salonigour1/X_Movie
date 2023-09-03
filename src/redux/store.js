import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import homeSlice from './features/homeSlice';
import trendingSlice from './features/trendingSlice';
import popularSlice from './features/popularSlice';
import topRatedSlice from './features/topRatedSlice';

export const store = configureStore({
  reducer: {
    home: homeSlice,
    trending: trendingSlice,
    popular: popularSlice,
    topRated: topRatedSlice,
  },
});
