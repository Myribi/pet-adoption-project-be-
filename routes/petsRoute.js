const express = require('express');
const router = express.Router();
const {getPets, getPetById} = require('../controllers/petsController');
const { isQueryValid } = require('../middleware/petsMiddleware');
const { validateBody } = require('../middleware/validateBody');
const { petsSchema } = require('../schemas/allschemas');

router.get('/', validateBody(petsSchema),isQueryValid,getPets)
router.get('/:id', getPetById)


  
module.exports = router