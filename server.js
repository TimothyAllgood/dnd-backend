// Packages
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();

const routes = require('./routes');

// Config
const PORT = process.env.PORT;

app.use(
	cors({
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
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.user);

// Start Server
app.listen(PORT, console.log('Server running on port ', PORT));
