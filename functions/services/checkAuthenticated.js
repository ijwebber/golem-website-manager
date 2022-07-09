const jwt = require("jsonwebtoken");
const User = require("../models/golem/user");

module.exports = async function checkAuthenticated(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("User is not logged in");
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    await User.findById(decoded.id).then((user) => {
      req.user = user;
    });
    next();
  } catch (er) {
    res.clearCookie("token");
    return res.status(400).send(er.message);
  }
};
