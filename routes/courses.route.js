const express = require('express');
const { body } = require('express-validator');


const router = express.Router();

const {                 
        getAllCorses,
        getSingleCourse,
        createCourse,
        updateCourse,
        deleteCourse
    } = require('../controllers/courses.controller');



router.route('/')
        .get(getAllCorses )
        .post( 
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


router.route('/:courseId')
    .get( getSingleCourse )
    .patch(
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
    ], updateCourse )
    .delete(deleteCourse );


module.exports = router;


