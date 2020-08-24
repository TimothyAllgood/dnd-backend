const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
	participants: [],
	messages: [
		{
			message: String,
			from: String,
			to: String,
			sent: Date,
			read: Boolean,
		},
	],
});

module.exports = mongoose.model('Conversation', conversationSchema);
