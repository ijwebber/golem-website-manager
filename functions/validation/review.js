const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateReviewInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.text = !isEmpty(data.text) ? data.text : "";
  data.author = !isEmpty(data.author) ? data.author : "";

  // First Name checks
  if (Validator.isEmpty(data.text)) {
    errors.text = "text field is required";
  }
  // Last Name checks
  if (Validator.isEmpty(data.author)) {
    errors.author = "author field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};