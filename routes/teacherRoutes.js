const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');


router.get('/class/:email', teacherController.classDetails_get );
router.get('/class/:email/name/:name', teacherController.specificClassDetails_get );
router.get('/quiz/:subject/title/:title', teacherController.specificQuizDetails_get );

router.delete('/class/:email/name/:name', teacherController.specificClassDelete);

router.post('/class', teacherController.createClass_post );
// router.post('/submitquiz', teacherController.submitQuiz_post );


// router.post('/quiz',upload.single('file'),teacherController.createQuiz_post);
router.post('/quiz',teacherController.createQuiz_post);
router.post('/assignment',teacherController.createAssignment_post);

// router.get('/quiz',teacherController.quizDetails_get);


// router.get('/assignment/:email',teacherController.assignmentDetails_get);



module.exports = router;