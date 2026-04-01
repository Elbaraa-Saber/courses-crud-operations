const express = require('express');

const validationSchema = require('../middlewares/validationSchema').validationSchema;

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
        .post( validationSchema(), createCourse );


router.route('/:courseId')
    .get( getSingleCourse )
    .patch( validationSchema(), updateCourse )
    .delete(deleteCourse );


module.exports = router;


