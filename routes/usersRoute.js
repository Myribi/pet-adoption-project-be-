const express = require('express');
const {signup, login} = require('../controllers/usersController')
const router = express.Router()
const {validateBody} = require('../middleware/validateBody')
const {doesUserExist, hashedPassword, isExistingUser, verifyPassword} = require('../middleware/usersMiddleware')
const {userSchema,loginSchema} = require('../schemas/allschemas')
const {passwordsMatch, getUsers} = require('../middleware/usersMiddleware');
const jwt = require('jsonwebtoken')






router.post('/signup',validateBody(userSchema),doesUserExist, passwordsMatch, hashedPassword, signup)
router.post('/login', validateBody(loginSchema),isExistingUser, verifyPassword, login)
// router.get('/', getUsers)



module.exports = router  