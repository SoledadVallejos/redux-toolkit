// App.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost, fetchPosts } from './redux/slices/slices';


function App() {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = () => {
    dispatch(addPost('New Post', 'This is a new post.'));
  };

  const handleDeletePost = id => {
    dispatch(deletePost(id));
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleAddPost}>Add Post</button>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
