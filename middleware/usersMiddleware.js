const {getUserByEmailModel} = require('../models/usersModel')
const User = require("../models/usersModel");
const bcrypt = require('bcrypt')

function passwordsMatch(req, res, next) {
  if (req.body.password === req.body.repassword) {
    next();
    return;
  }
  res.status(400).send("passwords don't match");
}


async function doesUserExist(req, res, next) {
 const userExist = await User.findOne({ email: req.body.email})                                                                       
    if (userExist){ 
      res.status(400)
     .json({ email: "A user has already registered with this email" });
     return;
    }

  next();
  
}
 

async function hashedPassword(req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) throw err;
    req.body.password = hash;
    next();
  });
}



module.exports = { passwordsMatch , doesUserExist, hashedPassword};
