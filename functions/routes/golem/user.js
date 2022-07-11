require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load Permission Checks
const checkAuthenticated = require("../../services/checkAuthenticated");
const checkAdmin = require("../../services/checkAdmin");

// Get the user model
const User = require("../../models/golem/user");

// Register
router.post("/register", checkAuthenticated, checkAdmin, async (req, res) => {
  // Checking validation  
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Create a new user from the request body
  const newUser = new User(req.body);

  // Check if user with that username already exists
  User.findOne({ username: newUser.username }).then((user) => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    } else {
      // Encrypt the password and then save the user to the database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Login
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  // Find user by username & check whether the user exists
  User.findOne({ username }).then((user) => {
    if (!user) {
      return res.status(404).json({ usernamenotfound: "Username not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // Create JWT Payload
        const payload = {
          id: user.id,
        };
        // Sign token
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 86400, // 1 year in seconds
        });

        return res
          .cookie("token", token, { httpOnly: true })
          .send({ success: true });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.send({ success: true });
});

// Login Check
router.get("/login", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(200).json({ isLoggedIn: false });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    await User.findById(decoded.id).then((user) => {
      res.status(200).json({ isLoggedIn: true });
    });
  } catch (er) {
    res.clearCookie("token");
    return res.status(200).json({ isLoggedIn: false });
  }
});

// Getting the list of all the users
router.get("/", checkAuthenticated, checkAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Getting a user by id
router.get("/:id", checkAuthenticated, checkAdmin, getUser, (req, res) => {
  res.send(res.user);
});

// Updating a user
router.patch(
  "/:id",
  checkAuthenticated,
  checkAdmin,
  getUser,
  async (req, res) => {
    if (req.body.firstName != null) {
      res.user.firstName = req.body.firstName;
    }
    if (req.body.lastName != null) {
      res.user.lastName = req.body.lastName;
    }
    if (req.body.allowedSites != null) {
      res.user.allowedSites = req.body.allowedSites;
    }
    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Deleting a user
router.delete(
  "/:id",
  checkAuthenticated,
  checkAdmin,
  getUser,
  async (req, res) => {
    try {
      await res.user.remove();
      res.json({ message: "Deleted User" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
}

module.exports = router;
