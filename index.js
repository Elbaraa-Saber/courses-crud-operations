const express = require('express');

// start aplication
const app = express();

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


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});