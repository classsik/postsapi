import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = ({ posts, setPosts }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (posts.length === 0) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => setPosts(json));
    }
  }, []);

  const deletePost = (itemId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${itemId}`, {
      method: "DELETE",
    });
    setPosts(posts.filter((item) => item.id !== itemId));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: text,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setPosts([...posts, json]);
      });
    setTitle("");
    setText("");
  };

  return (
    <>
      <form className="add-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <textarea
          placeholder="Text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        ></textarea>
        <button className="add-post" type="submit">
          Добавить пост
        </button>
      </form>
      <div className="posts">
        {posts.map((item) => {
          return (
            <div key={item.id} className="post">
              <h3>{item.title}</h3>
              <p>{item.body.substr(0, 70)}...</p>
              <div>
                <Link to={`post/${item.id}`} state={{ item: item }}>
                  Подробнее...
                </Link>
                <button
                  className="post__delete"
                  onClick={() => deletePost(item.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
