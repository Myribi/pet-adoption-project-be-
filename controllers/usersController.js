const {v4: uuidv4 }= require('uuid')
const {addUserModel} = require('../models/usersModel')

async function getUsers (req,res) {
    try {
          res.send('this gets users')
    } catch(err) {
        res.status(500).send(err)
    }
  
}

// function signup(req,res) {
//     try {
//         res.send('hi')
//     }catch(err) {
//         console.log(err)
//     }
// }

async function signup(req,res) {
    try {
        const {name,phone,email} = req.body
        const newUser = {
            id : uuidv4(),
            name : name,
            phone : phone,
            email : email
        }
        const user = addUserModel(newUser)
        if (user) {
            res.send(newUser)
            return
        }
        
  } catch(err) {
      res.status(500).send(err)
  }
}

module.exports = { signup, getUsers }