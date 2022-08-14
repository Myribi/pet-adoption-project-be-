const fs = require('fs');
const path =require('path');
const pathToDb = path.resolve(__dirname, '../database/usersDb.json');

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