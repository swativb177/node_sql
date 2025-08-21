const express = require('express');
const create = require('../controller/Employee')
const router = express.Router();

router.post('/',create.create)


module.exports = router;  