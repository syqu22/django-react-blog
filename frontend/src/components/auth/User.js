import { useEffect, useContext } from "react";
import { useLocation } from "react-router";
import connection from "../../connection";
import UserContext from "./UserContext";

const User = () => {
  const userContext = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    connection
      .get("user/")
      .then((res) => {
        userContext.setUser(res.data);
        console.log(userContext.user);
      })
      .catch((err) => console.log(err.message));
  }, [location]);

  return null;
};

export default User;
