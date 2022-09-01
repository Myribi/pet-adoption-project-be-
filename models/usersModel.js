const path = require("path");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String },
  password: { type: String, required: true, minLength: 6 },
  admin: { type: Boolean, default: false },
  favPets: { type: [String] },
  fosteredPets: { type: [String]},
  adoptedPets: { type: [String]}
});

const userModel = mongoose.model("user", usersSchema);

async function getUserByEmailModel(email) {
  try {
    const user = await userModel.findOne({ email: email });
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function getUserByIdModel(id) {
  try {
    const userId = await userModel.findOne({ _id: id });
    return userId;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getUserByEmailModel, getUserByIdModel, userModel };
