const express = require("express");
const { isUser, isAdmin } = require("../middlewares/auth.middleware");
const getApiSession = require ('../controller/sessions.api.controller')
const { Router } = express;
const router = new Router();

router.get('/current', isUser, getApiSession)

module.exports = router 