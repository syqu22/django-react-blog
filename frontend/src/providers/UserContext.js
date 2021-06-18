import React, { createContext, useState, useEffect } from "react";
import connection from "../connection";
import PropTypes from "prop-types";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    connection
      .get("user/")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.array,
};
