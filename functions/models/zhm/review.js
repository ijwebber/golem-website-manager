var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  text: { type: String, required: true },
  author: { type: String, required: true }
});

module.exports = mongoose.model("Review", reviewSchema, 'zhm-reviews');
