const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessions = new Schema({
  user: {
    type: String,
    required: true
  },
  doctor: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  prescription: {
    type: String,
  },
  notes: {
    type: String,
  },
  patient_feedback: {
    type: String,
  },
  doctor_feedback: {
    type: String,
  },
  title: {
    type: String,
  },
  upcoming: {
    type: Boolean,
    default:true
  },
  status: {
    type: string,
    default:"0"
  },
});
module.exports = sessions;