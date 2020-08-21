const db = require('../models');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

const getOne = async (req, res) => {
	try {
		const foundUser = await db.User.findById(req.params.id);
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
		res.json({ updatedUser });
	} catch (error) {
		console.log(error);
	}
};

const updateProfileImg = async (req, res) => {
	// console.log(req.files);
	const file = req.file; // uploaded image
	let path = 'https://picsum.photos/150/150'; // default image
	if (file) {
		// if there is an uploaded image upload to cloudinary
		console.log(file.path);
		path = file.path;
		params = {
			profileImg: file.path,
		};
		db.User.findByIdAndUpdate(
			req.params.id,
			params,
			{ new: true },
			(err, updatedUser) => {
				console.log(updatedUser);
				res.json({ updatedUser });
			}
		);
		cloudinary.uploader.upload(file.path, function (result) {});
	} else {
		const user = await db.User.findById(req.params.id);
		res.json({ user });
	}
};

module.exports = {
	getOne,
	updateUser,
	updateProfileImg,
};
