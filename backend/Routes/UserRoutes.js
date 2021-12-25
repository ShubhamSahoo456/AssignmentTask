const express = require('express');
const {registeruser, loginUser} = require('../Controllers/UserController')

const router = express.Router()

router.post("/api/v1/register",registeruser)

router.post("/api/v1/login",loginUser)

module.exports = router