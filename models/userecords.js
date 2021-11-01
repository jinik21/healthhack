const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userrecordSchema = new Schema({
  email: {
    type: String,
    required: true
  },
});
module.exports = userrecordSchema;