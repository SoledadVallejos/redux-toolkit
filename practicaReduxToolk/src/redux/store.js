// store.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/slices';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
