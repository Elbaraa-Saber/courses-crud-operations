const express = require('express');

// start aplication
const app = express();

// CRUD (Create, Read, Update, Delete) operations
app.use(express.json()); // or body-parser

// joi or express-validator or zod-dev for validation 

const { body, validationResult  } = require('express-validator');
const { count } = require('node:console');

const {                 
        getAllCorses,
        getSingleCourse,
        createCourse,
        updateCourse,
        deleteCourse
    } = require('./controllers/courses.controller');

// get all courses
app.get('/api/courses', getAllCorses );


// get course by id
app.get('/api/courses/:courseId', getSingleCourse );


// create a new course
app.post('/api/courses', 
    [
        body('title')
            .notEmpty()
            .withMessage('Title is required')
            .isLength({min:2})
            .withMessage('Title at least 2 characters long'),
        body('price')
            .notEmpty()
            .isInt()
            .withMessage('Price is required')
    ], createCourse );

// update courses
app.patch('/api/courses/:courseId',
    [
        body('title')
            .notEmpty()
            .withMessage("Title is required")
            .isLength({min:2})
            .withMessage('Title at least 2 characters long'),
        body('price')
            .notEmpty()
            .isInt()
            .withMessage('Price is required')
    ], updateCourse );

app.delete('/api/courses/:courseId', deleteCourse );



app.listen(4000, () => {
    console.log('Server is running on port 4000');
});