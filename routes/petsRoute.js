const express = require('express');
const router = express.Router();
const {getPets, getAllNotes} = require('../controllers/petsController')
const { petsSchema } = require('../schemas/allschemas');

router.get('/', getPets)



module.exports = router