const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSiteInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.siteName = !isEmpty(data.siteName) ? data.siteName : "";
  data.siteAddress = !isEmpty(data.siteAddress) ? data.siteAddress : "";

  // First Name checks
  if (Validator.isEmpty(data.siteName)) {
    errors.siteName = "siteName field is required";
  }
  // Last Name checks
  if (Validator.isEmpty(data.siteAddress)) {
    errors.siteAddress = "siteAddress field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};