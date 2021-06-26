import React, { useState, useContext } from "react";
import { UserContext } from "../../providers/UserContext";
import { useHistory } from "react-router-dom";
import connection from "../../connection";

const initialData = Object.freeze({
  username: "",
  email: "",
  password: "",
  first_name: "",
  last_name: "",
});

const Signup = () => {
  const { fetchUser } = useContext(UserContext);
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
        first_name: formData.first_name,
        last_name: formData.last_name,
      })
      .then(() => {
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
            fetchUser();
            history.push("/");
          });
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err.message);
      });
  };

  return (
    <>
      <form className="user-form" onSubmit={handleSubmit} noValidate>
        <h1>Sign Up</h1>
        <div className="user-form-item">
          <label htmlFor="username">
            Username
            {error.detail && (
              <span className="invalid-value"> {error.detail} </span>
            )}
            {error.username && (
              <span className="invalid-value"> {error.username} </span>
            )}
          </label>
          <input
            type="text"
            required
            onChange={handleChange}
            id="username"
            name="username"
            style={
              error.username
                ? { borderColor: "var(--danger)" }
                : { borderColor: "var(--secondary)" }
            }
          />
        </div>
        <div className="user-form-item">
          <label htmlFor="email">
            E-Mail
            {error.email && (
              <span className="invalid-value"> {error.email} </span>
            )}
          </label>
          <input
            type="email"
            autoComplete="email"
            required
            onChange={handleChange}
            id="email"
            name="email"
            style={
              error.email
                ? { borderColor: "var(--danger)" }
                : { borderColor: "var(--secondary)" }
            }
          />
        </div>
        <div className="user-form-item">
          <label htmlFor="password">
            Password
            {error.password && (
              <span className="invalid-value"> {error.password} </span>
            )}
          </label>
          <input
            type="password"
            autoComplete="password"
            required
            onChange={handleChange}
            id="password"
            name="password"
            style={
              error.password
                ? { borderColor: "var(--danger)" }
                : { borderColor: "var(--secondary)" }
            }
          />
        </div>
        <div className="user-form-item">
          <label htmlFor="first_name">
            First Name (Optional)
            {error.first_name && (
              <span className="invalid-value"> {error.first_name} </span>
            )}
          </label>
          <input
            type="text"
            onChange={handleChange}
            id="first_name"
            name="first_name"
            style={
              error.first_name
                ? { borderColor: "var(--danger)" }
                : { borderColor: "var(--secondary)" }
            }
          />
        </div>
        <div className="user-form-item">
          <label htmlFor="last_name">
            Last Name (Optional)
            {error.last_name && (
              <span className="invalid-value"> {error.last_name} </span>
            )}
          </label>
          <input
            type="text"
            onChange={handleChange}
            id="last_name"
            name="last_name"
            style={
              error.last_name
                ? { borderColor: "var(--danger)" }
                : { borderColor: "var(--secondary)" }
            }
          />
        </div>
        <div className="user-form-item">
          <button className="animated-button" type="submit">
            <span>
              <strong>Confirm</strong>
            </span>
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;
