var express = require('express');
var router = express.Router();
const test = require('../controllers/testController');

router.get('/', test.getTest);

module.exports = router;