const express = require('express');
const router = express.Router();
const {
    loggingUser,
} = require('../controllers/auth');


router.post('/', loggingUser);


module.exports = router;
