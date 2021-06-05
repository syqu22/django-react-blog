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
    fetch("/api/posts")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setPostsList(data);
          setPage(1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Pagination logic
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
      .map((post) => <MinimalPost key={post.slug} {...post} />);
  };

  const renderRecentPosts = () => {
    return (
      <>
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
