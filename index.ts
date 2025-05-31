import express from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';

import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';

import { createLogger } from './helpers';

import { utilRoutes } from './services/systemService';

// logging
const console = createLogger('Server');

// get config path
require('dotenv').config();

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
	path: '/api_ws',
	cors: {
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	},
});
const port = process.env.PORT || 8080;

app.use(
	cors({
		origin: '*',
		credentials: true,
	})
);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/dist')));

// Mount the routes
app.use('/api/util', utilRoutes);

// Handle other routes
app.get('*', (req, res) => {
	if (fs.existsSync(path.join(__dirname + '/dist/index.html'))) {
		res.sendFile(path.join(__dirname + '/dist/index.html'));
	} else {
		res.status(404).send('Not Found');
	}
});

server.listen(port, () => {
	console.info(`Server is listening on port ${port}`);
});
