const express = require('express');
const {addUser, signup, getUsers} = require('../controllers/usersController')
const router = express.Router()
const {validateBody} = require('../middleware/validateBody')
const {doesUserExist, hashedPassword} = require('../middleware/usersMiddleware')
const {userSchema} = require('../schemas/allschemas')
const {passwordsMatch} = require('../middleware/usersMiddleware');
const { application } = require('express');






router.post('/signup',validateBody(userSchema),doesUserExist, passwordsMatch, hashedPassword, signup)
router.post('/login')
router.post('logout')
router.get('/login')

// router.post('/', validateBody(userSchema), addUser)


module.exports = router