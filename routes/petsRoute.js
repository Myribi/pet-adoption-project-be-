const express = require('express');
const router = express.Router();
const {getPets, getPetById, addPet} = require('../controllers/petsController');
const { isQueryValid } = require('../middleware/petsMiddleware');
const { validateBody } = require('../middleware/validateBody');
const { petsSchema } = require('../schemas/allschemas');
const {upload, picUrl, uploadToCloudinary} = require('../middleware/imagesMiddleware')

router.get('/', validateBody(petsSchema),isQueryValid,getPets)
router.get('/:id', getPetById)

// router.post('/addpet', addPet)
router.post('/addpet',validateBody(petsSchema), upload.single('picture'),uploadToCloudinary, picUrl, addPet)

  
module.exports = router