const { v4: uuidv4 } = require("uuid");
const { userModel } = require("../models/usersModel");
const User = require("../models/usersModel");
const { doesUserExist } = require("../middleware/usersMiddleware");
const jwt = require('jsonwebtoken')

async function signup(req, res) {
  const { name, phone, email, password, repassword } = req.body;
  if (!name || !email || !phone || !password || !repassword) {
    return res.status(400).send("Please fill all the fields");
  }
  try {
    const newUser = await userModel.create({
      name,
      phone,
      email,
      password,
    });
    
    console.log(newUser)
    await newUser.save();
    await res.send(newUser)
  } catch (err) {
    console.log(err);
  }
}

// async function login(req, res, next) {
//   const { email, password } = req.body;
//   let identifiedUser;
//   try {
//     identifiedUser = await User.findOne({ email: email });
//   } catch (err) {
//     res.status(400).send("Email or password is wrong");
//     next();
//   }
//   if (!identifiedUser || identifiedUser.password !== password) {
//     res.status(400).send("Email or password is wrong");
//     return next();
//   }
//   res.json({ message: "logged in!" });
// }

function login(req, res){

  try {
      const {user} = req.body;
      const token = jwt.sign({id: user.userId}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN});
      res.send({
          token: token, 
          user:user[0].name,
          email:user[0].email,
          phone:user[0].phone,
      
      });
  } catch (error) {
      console.log(error)
  }

}

module.exports = { signup, login };  
