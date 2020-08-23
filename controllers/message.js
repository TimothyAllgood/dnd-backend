const db = require('../models');

const io = require('../server').io;

const get = (req, res) => {
	res.send({ response: 'I am alive' }).status(200);
};

module.exports = {
	get,
};
