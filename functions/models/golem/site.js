var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var siteSchema = new Schema({
  siteName: { type: String, required: true },
  siteAddress: { type: String, required: true }
});

module.exports = mongoose.model("Site", siteSchema);
