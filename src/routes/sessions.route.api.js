const express = require("express");
const { isUser} = require("../middlewares/auth.middleware");
const getApiSession = require ('../controller/sessions.api.controller');
const router = new express.Router();

router.get('/current', isUser, getApiSession);

module.exports = router; 