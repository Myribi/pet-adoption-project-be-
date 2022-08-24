
const path =require('path');
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const User = require("../models/usersModel");

const usersSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true, minLength: 6},
})

const userModel = mongoose.model('user',usersSchema)

async function getUserByEmailModel(email){
  try {
      const user = await userModel.find({email: email}).exec()
      return user
  } catch (err) {
      console.log(err)
  }
}

module.exports={getUserByEmailModel, userModel}
// module.exports = mongoose.model('user',usersSchema)
  








































// function getUserByEmailModel(email) {
//     try {
//         const user = User.find((User) => User.email === email);
//         return user
//       } catch (err) {
//         console.log(err);
//       }
// }


// function getUsersModel() {
//     try {
//         const allUsers = fs.readFileSync(pathToDb)
//         return JSON.parse(allUsers)
//     }catch(err) {
//         console.log(err)
//     }
// }

// function addUserModel(newUser) {
//     try {
//         const allUsers = getUsersModel()
//         allUsers.push(newUser)
//         fs.writeFileSync(pathToDb,JSON.stringify(allUsers))
//         return true
//     }catch(err) {
//         console.log(err)
//     }
// }

// function getUserByEmailModel(email) {
//     try {
//         const allUsers = getUsersModel();
//         const user = allUsers.find((user) => user.email === email);
//         return user
//       } catch (err) {
//         console.log(err);
//       }
// }