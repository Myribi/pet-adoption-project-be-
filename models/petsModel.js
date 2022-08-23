
const path = require("path");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  adoptionStatus: { type: String, required: true },
  picture: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  color: { type: String, required: true },
  bio: { type: String, required: true },
  hypoallergnic: { type: String, required: true },
  dietery: { type: String, required: true },
  breed: { type: String, required: true },
});

module.exports = mongoose.model('pet',petSchema)
