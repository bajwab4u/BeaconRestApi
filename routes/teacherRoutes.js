const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.get('/class', teacherController.classInfo_get );
router.post('/class', teacherController.createClass_post );

module.exports = router;