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
	let params = {
		username: req.body.username,
		email: req.body.email,
		games: req.body.games,
		roles: req.body.roles,
		bio: req.body.bio,
		city: req.body.city,
		lat: req.body.lat,
		lng: req.body.lng,
	};
	try {
		const updatedUser = await db.User.findByIdAndUpdate(req.params.id, params, {
			new: true,
		});
		console.log(updatedUser);
		res.json({ updatedUser });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getOne,
	updateUser,
};
