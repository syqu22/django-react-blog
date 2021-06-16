import React, { useState, useEffect } from "react";
import connection from "../../connection";
import UserContext from "../UserContext";

const User = () => {
  const [test, setTest] = useState({});

  useEffect(() => {
    connection
      .get("user/")
      .then((res) => setTest(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <UserContext.Consumer>
      {({ user, setUser }) => {
        console.log(user);
        {
          setUser(test);
        }
      }}
    </UserContext.Consumer>
  );
};

export default User;
