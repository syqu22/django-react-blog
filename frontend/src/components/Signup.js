import React, { useState } from "react";
import connection from "../connection";

const Signup = () => {
  const initialData = Object.freeze({
    username: "",
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    connection
      .post("auth/user/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        console.log(res);
        console.log("TODO");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      <input type="text" required onChange={handleChange} name="username" />
      <input
        type="email"
        autoComplete="email"
        required
        aria-label="test"
        name="email"
        onChange={handleChange}
      />
      <input
        type="password"
        autoComplete="password"
        required
        onChange={handleChange}
        name="password"
      />
      <button type="submit">Test</button>
    </form>
  );
};

export default Signup;
