import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import MinimalPost from "./MinimalPost";

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
        <h3 className="item-text">Recent posts:</h3>
        <div className="container">
          {postsList.map((post) => (
            <MinimalPost key={post.slug} {...post} />
          ))}
        </div>
        <button className="item-text">See more</button>
      </>
    );
  };

  return (
    <div className="home-page">
      {postsList.length ? renderRecentPosts() : ""}
      <Hero />
    </div>
  );
};

export default HomePage;
