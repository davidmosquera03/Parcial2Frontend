import { useEffect, useState } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("userId");

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

  const handleLike = async (id) => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:8083/api/tweets/likes", {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tweetId: id, userId }),
    });

    fetchPosts(); // Refresca la lista
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmed) return;

    const response = await fetch("http://localhost:8083/api/tweets", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        tweetId: id,
        userId: localStorage.getItem("userId"),
      }),
    });
    if (response.status == 403) {
      alert("You cannot erase Tweets from other users");
    }
    fetchPosts();
  };

  const handleReply = (originalPost) => {
    const replyContent = prompt("Reply to this post:");
    if (replyContent) {
      const token = localStorage.getItem("token");
      // Se envía también el id del post al que se está respondiendo
      fetch("http://localhost:8083/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          content: replyContent,
          replyTo: originalPost._id,
          userId,
        }),
      }).then(() => fetchPosts());
    }
  };

  return (
    <div>
      <h3>Posts</h3>
      {posts.length === 0 && <p>No posts yet.</p>}
      <ul>
        {posts.map((post) => (
          <li key={post._id} style={{ marginBottom: "20px" }}>
            <strong>{post.user?.name || "Anon"}:</strong>{" "}
            {post.replyTo && (
              <div
                style={{
                  background: "#f9f9f9",
                  padding: "5px",
                  marginBottom: "5px",
                  borderLeft: "3px solid #ccc",
                }}
              >
                <small>In reply to: </small>
                <em>{post.replyTo.content}</em>
              </div>
            )}
            {post.content}
            <br />
            <small>{new Date(post.createdAt).toLocaleString()}</small>
            <div style={{ marginTop: "5px" }}>
              <button onClick={() => handleLike(post._id)}>
                ❤️ Like ({post.likes?.length || 0})
              </button>
              <button onClick={() => handleDelete(post._id)}>🗑️ Delete</button>
              <button onClick={() => handleReply(post)}>💬 Reply</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
