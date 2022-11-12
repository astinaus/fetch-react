import React, { useCallback, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";

const App = () => {
  const [postId, setPostId] = useState(1);

  const [post, setPost] = useState(null);

  const getPost = useCallback(
    () =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {method: "GET"})
        .then((response) => response.json())
        .then((data) => setPost(data)),
    [postId]
  );
  useEffect(() => {
    checkPost();
    getPost();
  }, [getPost]);

  const checkPost = () => {
    if (postId === 0) {
      alert("첫번째 글입니다.");
      setPostId(1);
      return;
    }
  };

  return (
    <div>
      {post == null ? (
        <div>로딩 중...</div>
      ) : (
        <Card style={{ width: "18rem" }}>
          <Card.Header>Post 1 데이터</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>{post.userId}</ListGroup.Item>
            <ListGroup.Item>{post.id}</ListGroup.Item>
            <ListGroup.Item>{post.title}</ListGroup.Item>
            <ListGroup.Item>{post.body}</ListGroup.Item>
          </ListGroup>
        </Card>
      )}
      <button onClick={() => setPostId((prev) => prev + 1)}>
        다음 글 보기
      </button>
      <button onClick={() => setPostId((prev) => prev - 1)}>
        이전 글 보기
      </button>
      <br />
      <button onClick={() => setPostId(1)}>처음 글 보기</button>
    </div>
  );
};

export default App;
