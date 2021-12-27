const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/User');
const checkLogPw = require('../middlewares/checkLoginAndPassword');

router.post('/signup', checkLogPw.checkLoginAndPassword, userCtrl.signup);
router.post('/login', checkLogPw.checkLoginAndPassword, userCtrl.login);

module.exports = router;