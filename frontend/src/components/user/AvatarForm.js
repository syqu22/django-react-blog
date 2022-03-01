import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../../providers/UserContext";
import connection from "../../connection";

const AvatarForm = () => {
  const { user } = useContext(UserContext);
  const [error, setError] = useState({});
  const [avatar, setAvatar] = useState({});
  const fileInput = useRef();

  useEffect(() => {
    setAvatar({ name: "", url: user.avatar });
  }, []);

  const handleChange = () => {
    const file = fileInput.current.files[0];
    setAvatar({ name: file.name, url: URL.createObjectURL(file) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = fileInput.current.files[0];

    if (file.size > 5242880) {
      setError({ detail: "Image cannot exceed 5MB." });
    } else {
      let formData = new FormData();
      formData.append("avatar", file);
      connection.post("user/avatar/", formData).catch((err) => {
        setError(err.response.data);
        console.log(err.message);
      });
    }
  };

  return (
    <form className="user-item center" onSubmit={handleSubmit} noValidate>
      <h1>Avatar</h1>
      {error.detail && <span className="invalid-value">{error.detail}</span>}
      {error.avatar && <span className="invalid-value">{error.avatar}</span>}

      <div className="avatar-preview">
        <img src={avatar.url} className="avatar" />
        <img src={avatar.url} className="avatar-medium" />
        <img src={avatar.url} className="avatar-big" />
      </div>
      <label htmlFor="file" className="file-input">
        Upload Avatar
      </label>
      {avatar.name ? <p>File name: {avatar.name}</p> : <p>No file choosen.</p>}
      <input
        type="file"
        name="file"
        id="file"
        accept="image/png, image/jpeg"
        ref={fileInput}
        onChange={handleChange}
      />
      <button className="animated-button" type="submit">
        <span>
          <strong>Confirm</strong>
        </span>
      </button>
    </form>
  );
};

export default AvatarForm;
