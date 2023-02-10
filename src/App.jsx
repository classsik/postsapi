import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

function App() {
  const [posts, setPosts] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage posts={posts} setPosts={setPosts} />}
          />
          <Route
            path="/post/:id"
            element={<PostPage posts={posts} setPosts={setPosts} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
