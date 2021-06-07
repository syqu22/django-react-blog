import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import MinimalPost from "./MinimalPost";
import NavBar from "./NavBar";

const HomePage = () => {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    fetch("/api/posts/recent")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setPostsList(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderRecentPosts = () => {
    return (
      <>
        <h3 className="recent-text">Recent posts:</h3>
        <div className="container">
          {postsList.map((post) => (
            <MinimalPost key={post.slug} {...post} />
          ))}
        </div>
        <div className="recent-text">
          <Link className="recent-button" to="/posts">
            <span>See more</span>
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className="home-page">
      <NavBar />
      {postsList.length ? renderRecentPosts() : ""}
      <Hero />
    </div>
  );
};

export default HomePage;
