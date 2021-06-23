import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import connection from "../connection";
import Hero from "./Hero";
import MinimalPost from "./posts/MinimalPost";

const image1_url =
  "https://i2.wp.com/files.123freevectors.com/wp-content/original/131249-dark-grey-low-poly-abstract-background-design-vector.jpg?w=1980&q=100";
const image2_url =
  "https://img.wallpapersafari.com/desktop/1920/1080/18/57/wAt1gI.jpg";

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
      <Hero image_url={image1_url}>
        <h1>Welcome to my Blog</h1>
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
              <span>See more</span>
            </Link>
          </div>
        </div>
      )}

      <Hero image_url={image2_url}>
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
