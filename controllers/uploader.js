/**
 * File: controllers/uploader.js
 * @description Router / Controller to handler file upload API endpoint
 * @author Sandeep Singh <contact@ersandeepsingh.com>
 * @license MIT
 */


const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const uploadPath = "/uploads";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/../public', uploadPath))
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.substring((file.originalname.lastIndexOf('.') + 1));
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + ext);
    }
})

const uploader = multer({ storage: storage });

router.post('/', uploader.single('file'), (req, res, next) => {
    console.log(req.file, req.body);
    
    const file = { ...req.file };
    delete file.destination;
    
    file.path = uploadPath + "/" + file.filename;

    res.json(file);
});

module.exports = router;