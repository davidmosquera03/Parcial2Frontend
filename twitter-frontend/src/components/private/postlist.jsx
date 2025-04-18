import { useEffect, useState } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8083/api/tweets", {
      headers: {
        "x-access-token": token,
      },
    });
    const data = await response.json();
    setPosts(data.data || []);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h3>Posts</h3>
      {posts.length === 0 && <p>No posts yet.</p>}
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <strong>{post.user?.name || "Anon"}:</strong> {post.content}
            <br />
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;