/**
 * File: app.js
 * @description Main routing file and express initializer for basic webserver
 * @author Sandeep Singh <contact@ersandeepsingh.com>
 * @license MIT
 */


 const express = require('express');
const app = express();

const todoApp = require('./controllers/todo');
const uploader = require('./controllers/uploader');

app.use(express.urlencoded());
app.use(express.json());

app.use(express.static('public', {
    dotfiles: 'ignore',
    extensions: ['html'],
    index: 'index.html'
}));

app.use('/todo', todoApp);
app.use('/upload', uploader);

app.use((req, res, next) => {
    res.status(404).send("Not found");
});

module.exports = app;