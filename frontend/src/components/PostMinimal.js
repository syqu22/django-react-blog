import React, { useState } from "react";

const PostMinimal = () => {
  const [hovered, setHoverd] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className="post-minimal"
      onMouseOver={() => {
        setHoverd(true);
      }}
      onMouseLeave={() => {
        setHoverd(false);
      }}
      onClick={() => {
        setClicked(true);
      }}
    >
      <p>Title</p>
      <p>
        Hovered: {String(hovered)} Clicked: {String(clicked)}
      </p>
      <p>Description</p>
    </div>
  );
};

export default PostMinimal;
