import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../reducers/movieSlice';
import themeSlice from '../reducers/themeSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    themeSlice: themeSlice
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;