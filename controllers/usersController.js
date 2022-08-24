
const { userModel } = require("../models/usersModel");
const User = require("../models/usersModel");

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


function login(req, res){

  try {
      const {user} = req.body;
      console.log(user)
      const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN});
   
      res.send({
          token: token, 
          userId: user._id,
          user:user.name,
          email:user.email,
          phone:user.phone,
      });
  } catch (error) {
      console.log(error)
  }

}

async function getUserById(req, res){
  try {
    const userById = await userModel.findById(req.params.id);
    res.send(userById);
  } catch (err) {
    res.status(500).send("fetching user failed, try again later");
  }
}

async function editUserData(req, res){
  
  try {
      const newInfo = await userModel.findOneAndUpdate({ id: req.body.id },{email:req.body.email, }, (err)=>{
        
          if(err){
              console.log(err)
          }
          console.log("editado :)")
      })

  } catch (error) {
      console.log(error)
  }
}


module.exports = { signup, login, getUserById, editUserData};  
