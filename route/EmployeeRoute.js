const express = require('express');
const employeecontroller = require('../controller/Employee')
const router = express.Router();

router.post('/', employeecontroller.create)
router.get('/:id', employeecontroller.fetch);
router.put('/:id', employeecontroller.update);



module.exports = router;  
