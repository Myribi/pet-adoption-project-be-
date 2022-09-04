const express = require('express');
const router = express.Router();
const {getPets, getPetById, addPet,fosterOrAdopt, getFosteredAdoptedPets, getFosAdPets, editPetData} = require('../controllers/petsController');
const { isQueryValid, getPetInfo} = require('../middleware/petsMiddleware');
const { validateBody } = require('../middleware/validateBody');
const { petsSchema,editPetSchema} = require('../schemas/allschemas');
const {upload, uploadToCloudinary, updateToCloudinary, updatePhotoToCloudinary} = require('../middleware/imagesMiddleware');
const { auth, isAdmin, getUserInfo } = require('../middleware/usersMiddleware');
const { getFavPets } = require('../controllers/usersController');


router.get('/getadoptedfosteredpets', auth, getUserInfo, getFosteredAdoptedPets)


router.post('/:id/adoptfoster',auth,getPetInfo,fosterOrAdopt)

router.put('/editpet/:id', validateBody(editPetSchema), auth, getUserInfo, isAdmin, upload.single('editPicture'),updatePhotoToCloudinary,editPetData)
// router.put('/editpet/:id', editPetData)

router.post('/addpet', validateBody(petsSchema),auth, getUserInfo, isAdmin, upload.single('picture'),uploadToCloudinary, addPet)
router.get('/:id',getPetById)
router.get('/', validateBody(petsSchema), isQueryValid,getPets)

  
module.exports = router