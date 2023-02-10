import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const PostPage = ({ posts, setPosts }) => {
  const { state } = useLocation();
  const [post, setPost] = useState(state.item);
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.body);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
      .then((response) => response.json())
      .then((json) => setComments(json));
  }, []);

  const editPost = async () => {
    if (editing) {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: post.id,
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
          setPost(json);
          setPosts(posts.map((item) => (item.id === post.id ? json : item)));
        });
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>Назад</button>
      <br />
      <br />
      <button onClick={editPost}>
        {!editing ? "Изменить пост" : "Сохранить изменения"}
      </button>
      {!editing ? (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </>
      ) : (
        <div className="edit">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            placeholder="Text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          ></textarea>
        </div>
      )}
      <br />
      <h4>Комментарии:</h4>
      {comments.map((item) => {
        return (
          <div key={item.id} className="comment">
            <h3>{item.name}</h3>
            <p>{item.email}</p>
            <p>{item.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PostPage;
