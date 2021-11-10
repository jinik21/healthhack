const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    maxLength: 13
  },
  dob: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  doctor: {
    type: Boolean,
    default: false
  },
  doctor_assigned:{
    type:String,
    default:null
  },
  doctorinfo: {
    data: {
      yearofexperience: {
        type: String,
        required: true,
        default:0
      },
      liscence: {
        type: String,
        required: true,
        default:"-"
      },
      liscence_doc: {
        type: String,
        required: true,
        default:"-"
      }
    }
  },
  routines:{
    type:[{
      date:String,
      link:String
    }]
  }
});
module.exports = userSchema;