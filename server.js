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

io.sockets.on('connection', async (socket) => {
	let ready = false;
	const socketID = socket.id;
	console.log('Initial: ', socketID);
	const wait = new Promise((r, j) => {
		socket.on('fromClient', async (data) => {
			userIDS[socketID] = data.user;
			r('fine');
			console.log('During client emits:', socketID);
		});
	});

	await wait;

	console.log(userIDS);
	console.log('After client emits:', socketID);
	socket.join(userIDS[socketID]);

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
