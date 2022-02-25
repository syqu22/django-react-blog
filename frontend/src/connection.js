import axios from "axios";

let connection;

// Browser runtime
if (typeof window !== "undefined") {
  const baseURL = "/api/";

  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  connection = axios.create({
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
    function (response) {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;

      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        localStorage.getItem("refresh_token")
      ) {
        if (isRefreshing) {
          try {
            const token = await new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            });
            originalRequest.headers["Authorization"] = "JWT " + token;
            return await connection(originalRequest);
          } catch (err) {
            return await Promise.reject(err);
          }
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refresh = window.localStorage.getItem("refresh_token");
        return new Promise(function (resolve, reject) {
          connection
            .post("token/refresh/", { refresh })
            .then(({ data }) => {
              window.localStorage.setItem("access_token", data.access);
              window.localStorage.setItem("refresh_token", data.refresh);
              connection.defaults.headers["Authorization"] =
                "JWT " + data.access;
              originalRequest.headers["Authorization"] = "JWT " + data.access;
              processQueue(null, data.access);
              resolve(connection(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    }
  );
}

export default connection;
