import { useState } from "react";

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8083/api/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ content }),
    });
    if (response.ok) {
      setContent("");
      if (onPostCreated) onPostCreated();
    } else {
      alert("Error creating post");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        maxLength={280}
        required
      />
      <br />
      <button type="submit">Post</button>
    </form>
  );
}

export default CreatePost;