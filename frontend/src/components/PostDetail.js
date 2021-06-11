import React, { useState, useEffect } from "react";
import NotFound from "./errors/NotFound";
import Tags from "./Tags";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import moment from "moment";

const PostDetail = (props) => {
  const [post, setPost] = useState({});
  const [state, setState] = useState("loading");

  const slug = props.location.pathname.split("/")[2];

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Http error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setState("loaded");
      })
      .catch((error) => {
        console.log(error);
        setState("error");
      });
  }, []);

  const formatDate = (date) => {
    return moment(date).fromNow();
  };

  if (state === "error") {
    return <NotFound />;
  }

  if (state === "loading") {
    return null;
  }

  return (
    <div className="post">
      <div
        className="post-header"
        style={{ backgroundImage: `url("${post.thumbnail_url}")` }}
      />
      <h1>{post.title}</h1>
      <Tags values={post.tags} />
      <div className="post-info">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          className="avatar"
        />
        <p>{post.author}</p>
        <span>{formatDate(post.created_at)}</span>
        {post.read_time ? <span>Read time: {post.read_time} minutes</span> : ""}
      </div>
      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: `${post.body}` }}
      ></div>
      <div className="post-comments">
        <h2>Comments</h2>
        <CommentForm slug={slug} />
        <Comments slug={slug} />
      </div>
    </div>
  );
};

export default PostDetail;
