// Packages
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

require('dotenv').config();

const routes = require('./routes');

// Config
const PORT = process.env.PORT;

app.use(
	cors({
		origin: [`http://localhost:3000`],
		methods: 'GET,POST,PUT,DELETE',
		optionsSuccessStatus: 200,
	})
);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

io.sockets.on('connection', (socket) => {
	socket.on('fromClient', (data) => {});

	const room = socket.request.headers.referer.split('/').pop();

	socket.join(room);

	socket.on('SEND_MESSAGE', function (data) {
		console.log('message sent');
		io.to(data.to).to(data.from).emit('RECEIVE_MESSAGE', data);
	});
});

// Auth Routes
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.user);
app.use('/api/v1/messages', routes.messages);

// Start Server
server.listen(PORT, console.log('Server running on port ', PORT));
