import React, { useContext } from "react";
import { UserContext } from "../../providers/UserContext";

const AvatarForm = () => {
  const { user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="user-item" onSubmit={handleSubmit} noValidate>
      <h1>Avatar</h1>
      <img src={user.avatar} />
      <input type="file" accept="image/png, image/jpeg" />
      <button className="animated-button" type="submit">
        <span>Upload Avatar</span>
      </button>
    </form>
  );
};

export default AvatarForm;
