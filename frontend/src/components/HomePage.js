import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import MinimalPost from "./MinimalPost";

const HomePage = () => {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    fetch("/api/posts/recent")
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Http error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPostsList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const showPosts = (post) => {
    return <MinimalPost key={post.slug} {...post} />;
  };

  const renderRecentPosts = () => {
    return (
      <>
        <h3 className="recent-text">Recent posts:</h3>
        <div className="container">{postsList.map(showPosts)}</div>
        <div className="recent-text">
          <Link className="recent-button" to="/posts">
            <span>See more</span>
          </Link>
        </div>
      </>
    );
  };

  return (
    <>
      {postsList.length ? renderRecentPosts() : ""}
      <Hero />
    </>
  );
};

export default HomePage;
