import axios from "axios";

const baseURL = "/api/";

const connection = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

connection.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (
      localStorage.getItem("refresh_token") &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh_token = localStorage.getItem("refresh_token");

      return connection
        .post("/token/refresh/", { refresh: refresh_token })
        .then((response) => {
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);

          connection.defaults.headers["Authorization"] =
            "JWT " + response.data.access;
          originalRequest.headers["Authorization"] =
            "JWT " + response.data.access;

          return connection(originalRequest);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    return Promise.reject({ ...error });
  }
);

export default connection;
