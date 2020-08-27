// Packages
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

require('dotenv').config();

const routes = require('./routes');

// Config
const PORT = process.env.PORT;

app.use(
	cors({
		credentials: true,
		methods: 'GET,POST,PUT,DELETE',
		optionsSuccessStatus: 200,
	})
);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let userIDS = {};
io.sockets.on('connection', (socket) => {
	socket.on('fromClient', (data) => {
		userIDS[socket.id] = data.user;
		console.log(socket.id);
	});

	const room = socket.request.headers.referer.split('/').pop();
	console.log(socket.request.headers.cookie.split('io=').pop());
	console.log(userIDS);
	socket.join(userIDS[socket.request.headers.cookie.split('io=').pop()]);

	socket.on('SEND_MESSAGE', function (data) {
		console.log('message sent');
		console.log(socket.rooms);
		io.to(data.from).emit('RECEIVE_MESSAGE_FROM', data);
		io.to(data.to).emit('RECEIVE_MESSAGE', data);
	});
});

// Auth Routes
app.get('/', (req, res) => {
	res.send('hi').status(200);
});
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.user);
app.use('/api/v1/messages', routes.messages);
let users = [];
let socketIDs = {};

io.on('connection', async (socket) => {
	// users.push(socket.id);
	socket.on('join', function (room) {
		users.push(room);
		socketIDs[room] = socket.id;
		console.log(socket.id);
		io.emit('users', socketIDs);
	});
	socket.on('SEND_MESSAGE', function (data) {
		console.log(`Data: ${data.to}, Socket ID: ${socket.id}`);

		io.to(data.to).emit('RECEIVE_MESSAGE', data);
	});
});

// Start Server
server.listen(PORT, console.log('Server running on port ', PORT));
