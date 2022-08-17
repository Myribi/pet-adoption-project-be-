const {getUserByEmailModel} = require('../models/usersModel')


function passwordsMatch(req, res, next) {
  if (req.body.password === req.body.repassword) {
    next();
    return;
  }

  res.status(400).send("passwords don't match");
}

function doesUserExist(req, res, next) {
  console.log(req.body.email)
    const user = getUserByEmailModel(req.body.email)
    console.log(user)
    if (user) {
        
        res.status(400).send("user already exists")
      return;
    }
    next();
    
  }

module.exports = { passwordsMatch , doesUserExist};
