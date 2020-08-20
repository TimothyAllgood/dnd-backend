const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
	profileImg: String,
	Bio: String,
	city: String,
	lat: Number,
	lng: Number,
	role: String,
	games: [String],
	friends: [],
});

module.exports = mongoose.model('User', userSchema);
