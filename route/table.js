const express = require('express');
const create = require('../controller/table/create');
const update = require('../controller/table/update');
const fetch = require('../controller/table/view');
// const deleterow = require('../controller/table/delete');
const router = express.Router();

router.post('/',create.create)
router.put('/:id',update.update)

router.get('/:id', fetch.fetch);
// router.delete('/:id', deleterow.delete);
// router.put('/:id', usercontroller.update);

// router.delete('/:id', usercontroller.Delterow);


module.exports = router;  