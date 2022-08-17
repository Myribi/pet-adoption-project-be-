const { v4: uuidv4 } = require("uuid");
const { addUserModel } = require("../models/usersModel");
const User = require("../models/usersModel");

async function getUsers(req, res) {
  try {
    res.send("this gets users");
  } catch (err) {
    res.status(500).send(err);
  }
}


async function signup(req, res) {
  const { name, phone, email, password} = req.body;
  
  try {
  
  const newUser = await User.create({
    name,
    phone,
    email,
    password,
  });
  await newUser.save();
  res.status(200).json(newUser);
} catch (err) {
    console.log(err)
}
}
module.exports = { signup, getUsers };


