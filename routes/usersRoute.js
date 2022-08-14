const express = require('express');
const {addUser, signup, getUsers} = require('../controllers/usersController')
const router = express.Router()
const {validateBody} = require('../middleware/validateBody')
const {doesUserExist} = require('../middleware/usersMiddleware')
const {userSchema} = require('../schemas/allschemas')
const {passwordsMatch} = require('../middleware/usersMiddleware')

// router.get("/", getUsers) 

router.post('/signup', validateBody(userSchema), passwordsMatch, doesUserExist, signup)

// router.post('/', validateBody(userSchema), addUser)


module.exports = router