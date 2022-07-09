var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  allowedSites: {type: [mongoose.Schema.Types.ObjectId]}
});

module.exports = mongoose.model("User", userSchema);
