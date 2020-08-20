// imports
const router = require('express').Router();
const ctrl = require('../controllers');

// Current Path = '/api/v1/auth'

router.get('/:id', ctrl.user.getOne);
router.post('/:id', ctrl.user.updateUser);

// exports
module.exports = router;
