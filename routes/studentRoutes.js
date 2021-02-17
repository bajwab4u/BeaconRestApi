const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');


router.put('/class', studentController.joinClass_put);
router.get('/classDetails', studentController.classDetails_get);

module.exports = router;