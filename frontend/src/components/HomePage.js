import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import connection from "../connection";
import Hero from "./Hero";
import MinimalPost from "./posts/MinimalPost";

const HomePage = () => {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    connection
      .get("posts/", { params: { recent: true } })
      .then((res) => setPostsList(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const showPosts = (post) => {
    return <MinimalPost key={post.slug} {...post} />;
  };

  return (
    <>
      <Hero />
      {postsList.length > 0 && (
        <div>
          <h3 className="recent-text">Recent posts:</h3>
          <div className="container">{postsList.map(showPosts)}</div>
          <div className="recent-text">
            <Link className="animated-button" to="/posts">
              <span>See more</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
