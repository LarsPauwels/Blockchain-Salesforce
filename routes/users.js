const express = require('express');
const router = express.Router();
const userController = require("../controllers/users");

/* Product routes GET */

/* Product routes POST */
router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);

module.exports = router;