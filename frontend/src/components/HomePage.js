import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import connection from "../connection";
import Hero from "./Hero";
import MinimalPost from "./MinimalPost";

const HomePage = () => {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    connection
      .get("posts/?recent=true")
      .then((res) => setPostsList(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const showPosts = (post) => {
    return <MinimalPost key={post.slug} {...post} />;
  };

  return (
    <>
      {postsList.length > 0 && (
        <>
          <h3 className="recent-text">Recent posts:</h3>
          <div className="container">{postsList.map(showPosts)}</div>
          <div className="recent-text">
            <Link className="animated-button" to="/posts">
              <span>See more</span>
            </Link>
          </div>
        </>
      )}
      <Hero />
    </>
  );
};

export default HomePage;
