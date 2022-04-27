import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../providers/UserContext";
import { useHistory } from "react-router-dom";
import connection from "../../connection";

const initialData = Object.freeze({
  username: "",
  password: "",
});

const Login = () => {
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
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err.message);
      });
  };

  return (
    <>
      <form className="user-form" onSubmit={handleSubmit} noValidate>
        <h1>Log In</h1>
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
          <span>
            Don&apos;t remember password?
            <Link to="/password/reset"> Click here</Link>
          </span>
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

export default Login;
