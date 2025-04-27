const express = require('express');
const router = express.Router();
const { createProgram, getPrograms } = require('../controllers/programController');
const auth = require('../middleware/auth');

router.post('/', auth, createProgram);
router.get('/', auth, getPrograms);

module.exports = router;


