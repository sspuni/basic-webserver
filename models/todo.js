/**
 * File: models/index.js
 * @description Model for handling ToDo object's CRUD operations (inherited from base model) 
 * @author Sandeep Singh <contact@ersandeepsingh.com>
 * @license MIT
 */


const Model = require('./model');

class ToDo extends Model {
    constructor () {
        super("ToDo", "id");
    }
}

module.exports = ToDo;