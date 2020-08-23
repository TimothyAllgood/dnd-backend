// imports
const router = require('express').Router();
const ctrl = require('../controllers');

// Current Path = '/api/v1/auth'

router.get('/', ctrl.message.get);

// exports
module.exports = router;
