// Creamos Las Rutas
const express = require("express");
const { isUser, isAdmin } = require("../middlewares/auth.middleware");
const {getChat, getChatError} = require ('../controller/chat.controller')
const { Router } = express; 
const router = new Router();

router.get("/", isUser, getChat);
router.get("*", getChatError);

module.exports = router;
