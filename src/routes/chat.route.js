// Creamos Las Rutas
const express = require("express");
const { goToLogin, isUserPrimium } = require("../middlewares/auth.middleware");
const {getChat, getChatError} = require ('../controller/chat.controller');

const router = new express.Router(); 

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get("/", goToLogin, isUserPrimium, getChat);
router.get("*", getChatError);

module.exports = router;
