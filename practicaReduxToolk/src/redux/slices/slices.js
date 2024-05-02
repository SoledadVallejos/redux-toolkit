// slices.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchPostsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addPostSuccess(state, action) {
      state.posts.push(action.payload);
    },
    deletePostSuccess(state, action) {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
});

export const fetchPosts = () => async dispatch => {
  dispatch(postsSlice.actions.fetchPostsStart());

  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch(postsSlice.actions.fetchPostsSuccess(response.data));
  } catch (error) {
    dispatch(postsSlice.actions.fetchPostsFailure(error.message));
  }
};

export const addPost = (title, body) => async dispatch => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { title, body });
    dispatch(postsSlice.actions.addPostSuccess(response.data));
  } catch (error) {
    console.error('Failed to add post:', error);
  }
};

export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    dispatch(postsSlice.actions.deletePostSuccess(id));
  } catch (error) {
    console.error('Failed to delete post:', error);
  }
};

export default postsSlice.reducer;
