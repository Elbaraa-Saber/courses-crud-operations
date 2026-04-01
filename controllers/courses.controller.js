const express = require('express');

const { validationResult  } = require('express-validator');

const { courses } = require('../data/courses');

const getAllCorses = (req, res) => {
    res.json(courses);
}

const getSingleCourse = (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = courses.find((course) => course.id === courseId);
    if (!course){
        res.status(404).json({message: 'Course not fournd'});
        return;
    }
    res.json(course);
}

const createCourse = (req, res) => 
    {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        res.status(400).json({errors: errors.array()});
        return; 
    }
    const course = {id: courses.length + 1, ...req.body};
    courses.push(course);
    res.json(course).status(201);
}

const updateCourse = (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = courses.find((course) => course.id === courseId);
    if (!course) {
        res.status(404).json({message: 'Course not fournd'});
        return;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({errors: errors.array()});
        return;
    }
    course.title = req.body.title ?? course.title;
    course.price = req.body.price ?? course.price;
    return res.json(course);
}

const deleteCourse = (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const courseIndex = courses.findIndex((course) => course.id === courseId);
    if (courseIndex === -1) {
        res.status(404).json({message: 'Course not fournd'});
        return;
    }
    courses.splice(courseIndex, 1);
    res.status(204).send();

}

module.exports = {
    getAllCorses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse
}