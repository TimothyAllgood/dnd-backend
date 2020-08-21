const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
	profileImg: String,
	bio: String,
	city: String,
	location: {
		type: {
			type: String, // Don't do `{ location: { type: String } }`
			enum: ['Point'], // 'location.type' must be 'Point'
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
			default: [0, 0],
		},
	},
	lat: String,
	lng: String,
	roles: String,
	games: [String],
	friends: [],
});

module.exports = mongoose.model('User', userSchema);
