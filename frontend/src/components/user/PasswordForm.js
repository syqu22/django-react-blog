import React, { useContext, useState } from "react";
import connection from "../../connection";
import { UserContext } from "../../providers/UserContext";
import PropTypes from "prop-types";

const initialData = Object.freeze({
  password: "",
  new_password: "",
});

const PasswordForm = ({ setTab }) => {
  const { fetchUser } = useContext(UserContext);
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    connection
      .post(`user/password/change/`, {
        password: formData.password,
        new_password: formData.new_password,
      })
      .then(() => {
        fetchUser();
        setTab(0);
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err.message);
      });
  };

  return (
    <form className="user-item" onSubmit={handleSubmit} noValidate>
      <input type="text" autoComplete="username" hidden />
      <h1>Change Password</h1>
      <label htmlFor="password">
        Old Password
        {error.detail && (
          <span className="invalid-value"> {error.detail} </span>
        )}
        {error.password && (
          <span className="invalid-value"> {error.password} </span>
        )}
      </label>
      <input
        required
        onChange={handleChange}
        type="password"
        id="password"
        name="password"
        autoComplete="password"
        style={
          error.password
            ? { borderColor: "var(--danger)" }
            : { borderColor: "var(--secondary)" }
        }
      />
      <label htmlFor="new_password">
        New Password
        {error.new_password && (
          <span className="invalid-value"> {error.new_password} </span>
        )}
      </label>
      <input
        required
        onChange={handleChange}
        type="password"
        id="new_password"
        name="new_password"
        autoComplete="new-password"
        style={
          error.new_password
            ? { borderColor: "var(--danger)" }
            : { borderColor: "var(--secondary)" }
        }
      />
      <button className="animated-button" type="submit">
        <span>
          <strong>Confirm</strong>
        </span>
      </button>
    </form>
  );
};

PasswordForm.propTypes = {
  setTab: PropTypes.func,
};

export default PasswordForm;
