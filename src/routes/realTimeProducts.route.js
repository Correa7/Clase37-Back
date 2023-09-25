const express = require("express");
const router = new express.Router();
const { goToLogin,isAdminPrimium} = require("../middlewares/auth.middleware");
const { getRealTimeProducts, getRealTimeError} = require ('../controller/realTimeProducts.controller')

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get("/", goToLogin, isAdminPrimium, getRealTimeProducts); 
router.get("*", getRealTimeError); 

module.exports = router; 
