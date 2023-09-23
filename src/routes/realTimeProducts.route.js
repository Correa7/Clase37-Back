const express = require("express");
const { Router } = express;
const router = new Router();
const { isUser, isAdmin } = require("../middlewares/auth.middleware");
const { getRealTimeProducts, getRealTimeError} = require ('../controller/realTimeProducts.controller')

router.get("/", isAdmin, getRealTimeProducts); 
router.get("*", getRealTimeError);

module.exports = router; 
