import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import connection from "../connection";

const LogIn = () => {
  const initialData = Object.freeze({
    username: "",
    password: "",
  });

  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState({});
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    connection
      .post("token/", {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        connection.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        history.push("/");
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err);
      });
  };

  return (
    <>
      <h2>Log In</h2>
      <form className="user-form" onSubmit={handleSubmit} noValidate>
        <div className="user-form-item">
          <label htmlFor="username">Username</label>
          <span className="invalid-value"> {error.username} </span>
          <input
            type="text"
            required
            onChange={handleChange}
            id="username"
            name="username"
          />
        </div>
        <div className="user-form-item">
          <label htmlFor="password">Password</label>
          <span className="invalid-value"> {error.password} </span>
          <input
            type="password"
            autoComplete="password"
            required
            onChange={handleChange}
            id="password"
            name="password"
          />
        </div>
        <div className="user-form-item">
          <button type="submit">Log In</button>
        </div>
      </form>
    </>
  );
};

export default LogIn;
