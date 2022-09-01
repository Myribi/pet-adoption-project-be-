const express = require('express');
const router = express.Router();
const {getPets, getPetById, addPet,fosterOrAdopt, getFosteredAdoptedPets, getFosAdPets} = require('../controllers/petsController');
const { isQueryValid, getPetInfo} = require('../middleware/petsMiddleware');
const { validateBody } = require('../middleware/validateBody');
const { petsSchema} = require('../schemas/allschemas');
const {upload, uploadToCloudinary} = require('../middleware/imagesMiddleware');
const { auth, isAdmin, getUserInfo } = require('../middleware/usersMiddleware');
const { getFavPets } = require('../controllers/usersController');


router.get('/getadoptedfosteredpets', auth, getUserInfo, getFosteredAdoptedPets)


router.post('/:id/adoptfoster',auth,getPetInfo,fosterOrAdopt)


router.post('/addpet', validateBody(petsSchema),auth, getUserInfo, isAdmin, upload.single('picture'),uploadToCloudinary, addPet)
router.get('/:id',getPetById)
router.get('/', validateBody(petsSchema), isQueryValid,getPets)

  
module.exports = router