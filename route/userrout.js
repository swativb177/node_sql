const express = require('express');
const usercontroller = require('../controller/usercontroller');
const router = express.Router();

router.post('/',usercontroller.create)

router.get('/:id', usercontroller.fetch);

router.put('/:id', usercontroller.update);


module.exports = router;  