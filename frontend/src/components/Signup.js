import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import connection from "../connection";

const SignUp = () => {
  const initialData = Object.freeze({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
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
      .post("user/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then(() => {
        history.push("/login");
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err);
      });
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form className="user-form" onSubmit={handleSubmit} noValidate>
        <div className="user-form-item">
          <label htmlFor="username">Username</label>
          <span className="invalid-value"> {error.detail} </span>
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
          <label htmlFor="email">E-Mail</label>
          <span className="invalid-value"> {error.email} </span>
          <input
            type="email"
            autoComplete="email"
            required
            onChange={handleChange}
            id="email"
            name="email"
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
          <label htmlFor="first_name">First Name</label>
          <span className="invalid-value"> {error.first_name} </span>
          <input
            type="text"
            onChange={handleChange}
            id="first_name"
            name="first_name"
          />
        </div>
        <div className="user-form-item">
          <label htmlFor="last_name">Last Name</label>
          <span className="invalid-value"> {error.last_name} </span>
          <input
            type="text"
            onChange={handleChange}
            id="last_name"
            name="last_name"
          />
        </div>
        <div className="user-form-item">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
