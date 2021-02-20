const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/class/:email', studentController.classDetails_get);
router.put('/class', studentController.joinClass_put);


module.exports = router;