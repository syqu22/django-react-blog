import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import MinimalPost from "./MinimalPost";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const HomePage = () => {
  const [postsList, setPostsList] = useState([]);
  const [canLeft, setLeft] = useState(false);
  const [canRight, setRight] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        // Reduce data to max of 10 elements
        if (data) {
          data.slice(0, 10);
          setPostsList(data);
          setPage(1);
        }
      });
  }, []);

  useEffect(() => {
    // Pagination logic
    console.log(postsList);
    if (page - 1 < 1) {
      setLeft(false);
    } else {
      setLeft(true);
    }
    if (page + 3 >= postsList.length) {
      setRight(false);
    } else {
      setRight(true);
    }
  }, [page]);

  const renderPosts = () => {
    return postsList
      .slice(page - 1, page + 3)
      .map((post) => <MinimalPost key={post.id} {...post} />);
  };

  const renderRecentPosts = () => {
    return (
      <div>
        <label className="recent">Recent Posts:</label>
        <div className="posts-list">
          <button
            onClick={() => {
              canLeft && setPage(page - 1);
            }}
            className={`arrow-button ${!canLeft && "inactive"}`}
          >
            <FaArrowLeft />
          </button>
          {renderPosts()}
          <button
            onClick={() => {
              canRight && setPage(page + 1);
            }}
            className={`arrow-button ${!canRight && "inactive"}`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
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
