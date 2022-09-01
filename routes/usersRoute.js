const express = require('express');
const {signup, login, addFavPet, editUserData, editUserPwd, getFavPets, removeFavPets} = require('../controllers/usersController')
const router = express.Router()
const {validateBody} = require('../middleware/validateBody')
const {doesUserExist, hashedPassword, isExistingUser, verifyPassword, passwordsUpdatedMatch, updatedHashedPassword, passwordsCompare, isExistingUserPwd, getUserInfo} = require('../middleware/usersMiddleware')
const {userSchema,loginSchema, profileSchema, pwdSchema, favSchema} = require('../schemas/allschemas')
const {passwordsMatch, auth} = require('../middleware/usersMiddleware');
const { getfosteredOrAdoptedPets, getFosteredPets, getAdoptedPets, getFosteredAdoptedPets } = require('../controllers/petsController');


router.post('/signup', validateBody(userSchema), doesUserExist, passwordsMatch, hashedPassword, signup)
router.post('/login', validateBody(loginSchema), isExistingUser, verifyPassword, login)

router.post('/favpets', validateBody(favSchema), auth, getUserInfo, addFavPet)
router.get('/getfavpets', auth, getUserInfo, getFavPets)
router.post('/removefavpets', auth, getUserInfo, removeFavPets)


router.put('/profile',validateBody(profileSchema), auth, editUserData )
router.put('/profile/changePwd',validateBody(pwdSchema), auth,isExistingUserPwd, passwordsCompare, passwordsUpdatedMatch, updatedHashedPassword, editUserPwd)


module.exports = router  