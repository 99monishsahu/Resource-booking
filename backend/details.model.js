const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Info = new Schema({
  res_name: {
    type: String
  },

  userId: {
    type: String
  },

  person_name: {
    type: String
  },

  person_number: {
    type: Number
  },

  person_email: {
    type: String
  },

  booking_date_start: {
    type: String
  },

  booking_date_end: {
    type: String
  },

  status: {
    type: String
  }
});

module.exports = mongoose.model("Info", Info);
