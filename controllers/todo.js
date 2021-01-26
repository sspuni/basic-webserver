/**
 * File: controllers/todo.js
 * @description Routing / Controller logic for TODO API
 * @author Sandeep Singh <contact@ersandeepsingh.com>
 * @license MIT
 */

const express = require('express');
const ToDo = require('../models/todo');
const todoModel = new ToDo();
const router = express.Router();

router.get('/', (req, res, next) => {
    const todos = todoModel.getAll();
    res.json(todos);
});

router.post('/', (req, res, next) => {
    const todo = req.body;
    
    if (!todo || !todo.text) {
        return res.status(400).json({error: 'Missing required payload: todo->text'});
    }
    
    if (todo.status && !["pending", "completed"].includes(todo.status)) {
        return res.status(400).json({error: `Invalid TODO status: ${todo.status}. Allowed value is 'pending' or 'completed'`});
    } else if(!todo.status) {
        todo.status = "pending";
    }
    
    const insertedToDo = todoModel.create({text: todo.text, status: todo.status});

    res.json(insertedToDo);
});

router.patch('/:id/:status', (req, res, next) => {
    const id = parseInt(req.params.id) || 0;
    const todo = todoModel.get(id);
    
    if(!todo) {
        return res.status(404).json({error: 'Todo not found'});
    }
    
    if(!req.params.status || !["pending", "completed"].includes(req.params.status)) {
        return res.status(400).json({error: `Invalid TODO status: ${req.params.status}. Allowed value is 'pending' or 'completed'`});
    }

    todo.status = req.params.status;
    const updatedToDo = todoModel.update(id, todo);

    res.json(updatedToDo);
});

router.delete('/:id', (req, res, next) => {
    const todo = todoModel.delete(req.params.id);
  
    if(!todo) {
        return res.status(404).json({error: 'Todo not found'});
    }

    res.json(todo);
});

module.exports = router;