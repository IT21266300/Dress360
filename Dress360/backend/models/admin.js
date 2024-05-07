const mongoose = require("mongoose");
const Joi = require('joi');

const adminSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
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
  confirmPassword: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  key: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 25
  },
});

const Admin = mongoose.model("Admin", adminSchema);

function validateAdmin(admin) {
  const schema = {
    Name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    key: Joi.string()
      .min(6)
      .max(25)
      .required()
  };
  return Joi.validate(admin, schema);
}

exports.Admin = Admin;
exports.validate = validateAdmin;