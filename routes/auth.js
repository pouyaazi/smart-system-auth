var express = require('express');
const AuthController=require('../controller/auth');
var router = express.Router();

router.post('/login',AuthController.auth);

module.exports = router;
