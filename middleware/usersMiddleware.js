const {getUserByEmailModel, userModel} = require('../models/usersModel')
// const User = require("../models/usersModel");
const bcrypt = require('bcrypt')

function passwordsMatch(req, res, next) {
  if (req.body.password === req.body.repassword) {
    next();
    return;
  }
  res.status(400).send("passwords don't match");
}


async function doesUserExist(req, res, next) {
 const userExist = await userModel.findOne({ email: req.body.email})     
                                                                   
    if (userExist){ 
      res.status(400)
     .send("A user has already registered with this email");
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

async function getUsers(req, res, next) {
  let users;
  try {
    users = await userModel.find({}, 'email name' );
  } catch (err) {
    res.status(500).send("fetching users failed, try again later");
    return next()
  }
  res.json({users: users.map(user => user.toObject())})
}


async function isExistingUser(req,res,next){

  const user = await getUserByEmailModel(req.body.logEmail);
  if(user){
  req.body.user = user
  
  next()
  return;
  }
  res.status(400).send("User doesn't exist")

}


async function verifyPassword(req, res, next) {
  const { user } = req.body;

  bcrypt.compare(req.body.logPassword, user[0].password, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err)
      return;
    }
    if (result) {
      next();
      return;
    } else {
      res.status(400).send("Incorrrect Password!");
    }
  });
}

module.exports = { passwordsMatch , doesUserExist, hashedPassword, getUsers, isExistingUser, verifyPassword};
