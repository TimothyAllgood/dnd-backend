const db = require('../models');

const getOne = async (req, res) => {
	try {
		const foundUser = await db.User.findById(req.params.id);
		console.log(foundUser);
		res.json({ foundUser });
	} catch (error) {
		console.log(error);
	}
};

const updateUser = async (req, res) => {
	try {
		const updatedUser = await db.User.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.json({ updatedUser });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getOne,
	updateUser,
};
