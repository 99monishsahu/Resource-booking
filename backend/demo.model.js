const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Demo = new Schema({
  resource_name: {
    type: String,
    unique: true
  },

  status: {
    type: String
  }
});

module.exports = mongoose.model("Demo", Demo);
