import React, { useState, useEffect } from "react";
import moment from "moment";
import NotFound from "./errors/NotFound";
import Tags from "./Tags";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import PropTypes from "prop-types";
import connection from "../connection";

const PostDetail = (props) => {
  const [post, setPost] = useState({});
  const [state, setState] = useState("loading");

  const slug = props.location.pathname.split("/")[2];
  useEffect(() => {
    connection
      .get(`posts/${slug}`)
      .then((res) => {
        setPost(res.data);
        setState("loaded");
      })
      .catch((err) => {
        console.log(err.message);
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

PostDetail.propTypes = {
  location: PropTypes.object,
};

export default PostDetail;
