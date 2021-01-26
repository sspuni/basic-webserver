/**
 * File: index.js
 * @description Main entry point for the basic webserver
 * @author Sandeep Singh <contact@ersandeepsingh.com>
 * @license MIT
 */

const http = require('http');
const port = 3000;

const app = require('./app');

const server = http.createServer(app);

server.on('listening', () => {
    console.info('Server listening on http://localhost:%s/', port);
});

server.on('error', (error) => {
    console.error('Something went wrong: %s', error.message);
});

server.listen(port);