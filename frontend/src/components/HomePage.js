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
      <Hero image_url={"/media/images/hero1.jpg"}>
        <h1>Welcome to my Blog!</h1>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          semper eu est eget consectetur. Cras tristique nec nisi ac auctor.
          Cras ligula eros, sagittis et ultrices ut, cursus vitae erat. Aenean
          tempus elit ut auctor viverra. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas. Mauris quis
          diam lectus. Nulla maximus interdum nunc. Phasellus vitae erat
          egestas, pulvinar felis ac, semper lectus. Ut venenatis velit elit, at
          vestibulum eros ultricies laoreet.
        </span>
      </Hero>

      {postsList.length > 0 && (
        <div className="recent">
          <h3 className="recent-text">Recent posts:</h3>
          <div className="container">{postsList.map(showPosts)}</div>
          <div className="recent-text">
            <Link className="animated-button" to="/posts">
              <span>
                <strong>See more</strong>
              </span>
            </Link>
          </div>
        </div>
      )}

      <Hero image_url={"/media/images/hero2.jpg"}>
        <h1>About Me</h1>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          semper eu est eget consectetur. Cras tristique nec nisi ac auctor.
          Cras ligula eros, sagittis et ultrices ut, cursus vitae erat. Aenean
          tempus elit ut auctor viverra. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas. Mauris quis
          diam lectus. Nulla maximus interdum nunc. Phasellus vitae erat
          egestas, pulvinar felis ac, semper lectus. Ut venenatis velit elit, at
          vestibulum eros ultricies laoreet.
        </span>
      </Hero>
    </>
  );
};

export default HomePage;
