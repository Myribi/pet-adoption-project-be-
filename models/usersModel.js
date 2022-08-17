

const fs = require('fs');
const path =require('path');
const pathToDb = path.resolve(__dirname, '../database/usersDb.json');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  repassword: { type: String, required: true },
})

function getUsersModel() {
    try {
        const allUsers = fs.readFileSync(pathToDb)
        return JSON.parse(allUsers)
    }catch(err) {
        console.log(err)
    }
}

function addUserModel(newUser) {
    try {
        const allUsers = getUsersModel()
        allUsers.push(newUser)
        fs.writeFileSync(pathToDb,JSON.stringify(allUsers))
        return true
    }catch(err) {
        console.log(err)
    }
}

function getUserByEmailModel(email) {
    try {
        const allUsers = getUsersModel();
        const user = allUsers.find((user) => user.email === email);
        return user
      } catch (err) {
        console.log(err);
      }
}

module.exports = {getUsersModel, addUserModel, getUserByEmailModel}
module.exports = mongoose.model('users',usersSchema)