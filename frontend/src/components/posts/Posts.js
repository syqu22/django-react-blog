import React, { useState, useEffect } from "react";
import MinimalPost from "./MinimalPost";
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";
import connection from "../../connection";

const Posts = () => {
  const [postsList, setPostsList] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const postsPerPage = 4;

  useEffect(() => {
    connection
      .get("posts/")
      .then((res) => {
        setPostsList(res.data);
        setMaxPages(Math.ceil(res.data.length / postsPerPage));
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    let query = postsList.filter((e) => e.title.match(search));
    setMaxPages(Math.ceil(query.length / postsPerPage));
    // Swap to first page to make sure we won't be stuck on any page without items
    setCurrentPage(0);
  }, [search]);

  const queryFilter = (value) => {
    return value.title.toLowerCase().match(search);
  };

  if (postsList.length === 0) {
    return <h1 className="error">There are currently no public posts</h1>;
  }

  return (
    <div className="full-height">
      <SearchBar callback={setSearch} />
      <Pagination
        page={currentPage}
        maxPages={maxPages}
        handleChange={setCurrentPage}
      />
      <div className="container">
        {postsList
          .filter(queryFilter)
          .slice(
            currentPage * postsPerPage,
            currentPage * postsPerPage + postsPerPage
          )
          .map((post) => (
            <MinimalPost key={post.slug} {...post} />
          ))}
      </div>
    </div>
  );
};

export default Posts;
