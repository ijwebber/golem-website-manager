require("dotenv").config();

const express = require("express");
const router = express.Router();

// Validation checks
const validateSiteInput = require("../../validation/site");

// Authentication and Admin checks
const checkAuthenticated = require("../../services/checkAuthenticated");
const checkAdmin = require("../../services/checkAdmin");

const Site = require("../../models/golem/site");

// Add a site
router.post("/add", checkAuthenticated, checkAdmin, async (req, res) => {
    // Checking valid site data
    const { errors, isValid } = validateSiteInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    // Create a new user from the request body
    const newSite = new Site(req.body);
  
    // Check if a site already exists with that name
    Site.findOne({ siteName: newSite.siteName }).then((site) => {
      if (site) {
        return res.status(400).json({ siteName: "Sitename already exists" });
      } else {
        // Check if a site address exists with that address
        Site.findOne({ siteAddress: newSite.siteAddress }).then((site) => {
            if (site) {
                return res.status(400).json({ siteName: "Sitename already exists" });
            } else {
                // Add new site to the database
                newSite.save().then((user) => res.json(user)).catch((err) => console.log(err));
            }
        });
      }
    });
});

// Get all sites
router.get("/", checkAuthenticated, checkAdmin, async (req, res) => {
    try {
        const sites = await Site.find();
        res.json(sites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Getting a site by id
router.get("/:id", checkAuthenticated, async (req, res) => {
    // need to check if the user has access to that id
    const siteID = req.params.id;
    if (req.user.allowedSites.includes(siteID)) {
        let site;
        try {
            site = await Site.findById(req.params.id);
            if (site == null) {
                return res.status(404).json({ message: "Cannot find site" });
            } else {
                return res.send(site);
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        return res.status(403).json({ message: "You do not have permission to view this site" });
    }
});

module.exports = router;