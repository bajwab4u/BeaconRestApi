const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');



router.post('/login', authController.login_post );
router.put('/changePassword',authController.changePassword_put);
router.post('/signup', authController.signup_post );
router.get('/logout', authController.logout_get);


module.exports = router;
