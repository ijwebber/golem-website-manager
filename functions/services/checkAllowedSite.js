const jwt = require("jsonwebtoken");

const User = require("../models/golem/user");
const Site = require("../models/golem/site");

module.exports = async function checkAllowedSite(req, res, next, siteName) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("User is not logged in");
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    await User.findById(decoded.id).then((user) => {
      req.user = user;
    });

    await Site.findOne({siteName: siteName}).then((site) => {
      req.site = site;
    });

    if (req.user.allowedSites.includes(req.site._id)) {
      next();
    } else {
      res.status(403).send("You do not have permission")
    }
  } catch (er) {
    return res.status(400).send(er.message);
  }
};