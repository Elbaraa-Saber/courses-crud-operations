const express = require('express');

// start aplication
const app = express();

// CRUD (Create, Read, Update, Delete) operations
app.use(express.json()); // or body-parser

// joi or express-validator or zod-dev for validation 

const { body, validationResult  } = require('express-validator');
const { count } = require('node:console');


const courses = [
    {
        id: 1,
        title: "Js course", 
        price: 100
    },
    {
        id: 2,
        title: "React course", 
        price: 800
    },
]

// get all courses
app.get('/api/courses', (req, res) => {
    res.json(courses);
});


// get course by id
app.get('/api/courses/:courseId', (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = courses.find((course) => course.id === courseId);
    if (!course){
        res.status(404).json({message: 'Course not fournd'});
        return;
    }
    res.json(course);
});


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
    ], (req, res) => 
    {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        res.status(400).json({errors: errors.array()});
        return; 
    }
    const course = {id: courses.length + 1, ...req.body};
    courses.push(course);
    res.json(course).status(201);
})



app.listen(4000, () => {
    console.log('Server is running on port 4000');
});