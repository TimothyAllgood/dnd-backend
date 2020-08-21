// imports
const router = require('express').Router();
const ctrl = require('../controllers');

const multer = require('../middleware/photo-config');

// Current Path = '/api/v1/users'

router.get('/:id', ctrl.user.getOne);
router.get('/nearby/:id', ctrl.user.nearby);
router.post('/:id', ctrl.user.updateUser);
router.post('/image/:id', multer, ctrl.user.updateProfileImg);

// exports
module.exports = router;
