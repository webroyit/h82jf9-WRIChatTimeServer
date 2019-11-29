const express = require('express');
const socktio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 8000;

const router = require('./router');

const app = express();
const server = http.createServer(app);

// instance of socket.io
const io = socktio(server);

// use it as middleware
app.use(router);

server.listen(PORT, () => console.log("Server is running on " + PORT));