import React, { Suspense, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import NotFound from "../errors/NotFound";
import Tags from "./Tags";
import connection from "../../connection";
const Comments = React.lazy(() => import("../comments/Comments"));

const PostDetail = () => {
  const [post, setPost] = useState({});
  const [state, setState] = useState("loading");
  const location = useLocation();

  const slug = location.pathname.split("/")[2];

  useEffect(() => {
    connection
      .get(`posts/${slug}/`)
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
        style={{ backgroundImage: `url("${post.thumbnail}")` }}
      />
      <h1>{post.title}</h1>
      <Tags values={post.tags} />
      <div className="post-info">
        <img src={post.author.avatar} className="avatar-medium" />
        <p>
          {post.author.first_name} {post.author.last_name}
        </p>
        {post.author.title && <span>{post.author.title}</span>}
        <span>{formatDate(post.created_at)}</span>
        {post.read_time ? <span>Read time: {post.read_time} minutes</span> : ""}
      </div>
      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: `${post.body}` }}
      ></div>
      <div className="post-comments">
        <Suspense fallback={<h2>Loading comments...</h2>}>
          <h2>Comments</h2>
          <Comments slug={slug} />
        </Suspense>
      </div>
    </div>
  );
};

export default PostDetail;
