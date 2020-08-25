const db = require('../models');

const startConversation = async (req, res) => {
	try {
		const userOne = await db.User.findById(req.params.from);
		const userTwo = await db.User.findById(req.params.to);

		const params = {
			participants: {
				users: { userOne: userOne, userTwo: userTwo },
				ids: [req.params.from, req.params.to],
			},

			messages: [
				{
					message: 'Send the first message...',
					from: req.params.from,
					to: req.params.to,
					sent: new Date().toLocaleDateString(),
					read: false,
				},
			],
		};
		const newMessage = await db.Conversation.create(params);
		res.json({ newMessage });
	} catch (error) {
		console.log(error);
	}
};

const getMessages = async (req, res) => {
	try {
		const foundConversation = await db.Conversation.findOne({
			'participants.ids': {
				$all: [req.params.userOne, req.params.userTwo],
			},
		});
		res.json({ foundConversation });
	} catch (error) {
		console.log(error);
	}
};

const getConversations = async (req, res) => {
	try {
		const foundConversations = await db.Conversation.find({
			'participants.ids': { $in: [req.params.userOne] },
		});

		res.json({ foundConversations });
	} catch (error) {
		console.log(error);
	}
};

const getConversationById = async (req, res) => {
	try {
		console.log(req.params.id);
		const foundConversation = await db.Conversation.findById(req.params.id);
		res.json({ foundConversation });
	} catch (error) {
		console.log(error);
	}
};

const addMessage = async (req, res) => {
	try {
		const foundConversation = await db.Conversation.findOne({
			'participants.ids': {
				$all: [req.params.userOne, req.params.userTwo],
			},
		});

		const message = {
			message: req.body.message,
			from: req.params.userOne,
			to: req.params.userTwo,
			sent: new Date().toLocaleDateString(),
			read: false,
		};

		const newMessage = await db.Conversation.findByIdAndUpdate(
			foundConversation._id,
			{ $push: { messages: message } },
			{ new: true }
		);

		res.json({ newMessage });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	startConversation,
	getMessages,
	getConversations,
	getConversationById,
	addMessage,
};
