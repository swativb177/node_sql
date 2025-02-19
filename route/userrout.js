const express = require('express');
const usercontroller = require('../controller/usercontroller');
const router = express.Router();

router.post('/',usercontroller.create)

module.exports = router;  