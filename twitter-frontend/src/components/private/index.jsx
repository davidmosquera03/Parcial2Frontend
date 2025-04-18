import React, { useState } from "react";
import CreatePost from "./createpost";
import PostList from "./postlist";

function Private() {
  const [refresh, setRefresh] = useState(false);

  const handlePostCreated = () => setRefresh((r) => !r);

  return (
    <div>
      <h1>Portal</h1>
      <CreatePost onPostCreated={handlePostCreated} />
      {/* Al cambiar la key, forzamos que PostList se recargue */}
      <PostList key={refresh} />
    </div>
  );
}

export default Private;