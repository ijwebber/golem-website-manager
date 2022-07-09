const axios = require("axios");
axios.defaults.withCredentials = true;

export const isLoggedIn = async () => {
  return await axios
    .get("http://localhost:8000/golem/user/login", { withCredentials: true })
    .then((res) => {
      return res.data.isLoggedIn;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const login = async (username, password) => {
  return await axios
    .post(
      "http://localhost:8000/golem/user/login",
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    )
    .then((res) => {
      return { success: res.data.success };
    })
    .catch(function (err) {
      return { success: false, errors: err.response.data };
    });
};

export const logout = async () => {
  return await axios
    .post("http://localhost:8000/golem/user/logout", { withCredentials: true })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
