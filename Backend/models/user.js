const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    address: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    },
  });