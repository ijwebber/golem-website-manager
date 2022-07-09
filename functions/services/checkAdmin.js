module.exports = async function checkAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    res.status(401).send("User is not an admin");
  } else {
    next();
  }
};
