// imports
const router = require('express').Router();
const ctrl = require('../controllers');

router.get('/conversations/:userOne', ctrl.messages.getConversations);
router.post('/conversation/:userOne/:userTwo', ctrl.messages.addMessage);
router.get('/conversationByID/:id', ctrl.messages.getConversationById);
router.post('/:from/:to', ctrl.messages.startConversation);
router.get('/:userOne/:userTwo', ctrl.messages.getMessages);

// exports
module.exports = router;
