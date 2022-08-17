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

// async function signup(req,res) {
//     try {
//         const {name,phone,email, password, repassword} = req.body
//         const newUser = {
//             id : uuidv4(),
//             name : name,
//             phone : phone,
//             email : email,
//             password : password,
//             repassword : repassword
//         }
//         const user = addUserModel(newUser)
//         if (user) {
//             res.send(newUser)
//             return
//         }

//   } catch(err) {
//       res.status(500).send(err)
//   }
// }

async function signup(req, res) {
  
  try {
    const { name, phone, email, password, repassword } = req.body;
    const newUser = await User.create({name, phone, email, password, repassword});
    await newUser.save()
    res.status(200).json(newUser)
  } catch (err) {
    res.status(400).send({err: err.message});
  }
}

module.exports = { signup, getUsers };
