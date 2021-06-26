import React, { useEffect, useState } from "react";
import connection from "../../connection";

const EmailVerification = () => {
  const [error, setError] = useState({});
  const uid = location.pathname.split("/")[3];
  const token = location.pathname.split("/")[4];

  useEffect(() => {
    connection.post(`user/activate/${uid}/${token}`).catch((err) => {
      setError(err.response.data);
      console.log(err.message);
    });
  }, []);

  console.log(error);

  return (
    <div>
      {error && <p>error.detail</p>}
      <h1>E-Mail successfully verified.</h1>
    </div>
  );
};

export default EmailVerification;
