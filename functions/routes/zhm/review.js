const express = require("express");
const router = express.Router();

// Validation checks
const validateReviewInput = require("../../validation/review");

// Authentication and Admin checks
const checkAuthenticated = require("../../services/checkAuthenticated");
const checkAllowedSite = require("../../services/checkAllowedSite");
// Closure to check for zhm access
const checkAllowedZHM = (req, res, next) => {
    checkAllowedSite(req, res, next, "ZephyrHillMusic");
}

const Review = require("../../models/zhm/review");

// Add a review
router.post("/add", async (req, res) => {
    const { errors, isValid } = validateReviewInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    // Add the new review to the database
    const newReview = new Review(req.body);
    newReview.save().then((user) => res.json(user)).catch((err) => console.log(err));
});

// Get all reviews, should be public
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;