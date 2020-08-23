// Packages
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

require('dotenv').config();

const routes = require('./routes');

// Config
const PORT = process.env.PORT;

app.use(
	cors({
		credentials: true,
		origin: [`http://localhost:3000`],
		methods: 'GET,POST,PUT,DELETE',
		// credentials: true, // allows the session cookie to be sent back and forth from server to client
		optionsSuccessStatus: 200, // some legacy browsers choke on satus 204
	})
);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Auth Routes
app.get('/', (req, res) => {
	res.send('hi').status(200);
});
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.user);
app.use('/api/v1/message', routes.message);

io.on('connection', function (socket) {
	console.log(socket.id);
	socket.on('SEND_MESSAGE', function (data) {
		io.emit('RECEIVE_MESSAGE', data);
	});
});

// Start Server
http.listen(PORT, () => {
	console.log('listening on *:3000');
});
module.exports.io = io;
