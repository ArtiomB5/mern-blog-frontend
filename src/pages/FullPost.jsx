import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

const getPost = (id, setData, setError, setLoading) => {
  axios.get(`posts/${id}`)
  .then(res => {
    setData(res.data)
  })
  .then(() => setLoading(false))
  .catch(err => {
    console.log(err)
    setError("Ошибка при получении статьи")
    setLoading(false)
  })
};

export const FullPost = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPost(id, setData, setError, setIsLoading);
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} />
  }

  return (
    <>
      {error === null && !isLoading && <div>{error}</div>}
      {data !== null 
      && error === null
      && !isLoading
      && (
        <>
          <Post
            id={data.id}
            title={data.title}
            imageUrl={data.imageUrl}
            user={data.user}
            createdAt={data.createdAt}
            viewsCount={data.viewsCount}
            commentsCount={3}
            tags={data.tags}
            isFullPost
          >
            <p>
              {data.text}
            </p>
          </Post>
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий 555555",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          >
            <Index />
          </CommentsBlock>
        </>
      )}
    </>
  );
};
