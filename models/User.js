const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
	profileImg: String,
	Bio: String,
	city: String,
	lat: String,
	lng: String,
	roles: String,
	games: [String],
	friends: [],
});

module.exports = mongoose.model('User', userSchema);
