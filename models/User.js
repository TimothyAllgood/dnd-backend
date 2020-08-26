const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
	profileImg: {
		type: String,
		default:
			'https://cdna.artstation.com/p/assets/images/images/010/658/388/large/drakhas-oguzalp-donduren-goblin-face.jpg?1525547601',
	},
	bio: {
		type: String,
		default: 'Tell us a little about yourself, brave adventurer...',
	},
	city: String,
	location: {
		type: {
			type: String, // Don't do `{ location: { type: String } }`
			enum: ['Point'], // 'location.type' must be 'Point'
		},
		coordinates: {
			type: [Number],
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
