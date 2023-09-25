const express= require('express');
const { goToLogin, isUserPrimium } = require("../middlewares/auth.middleware");
const { cartView, getViewsError } = require('../controller/views.controller');

const router = new express.Router(); 
  
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get('/', goToLogin, isUserPrimium, cartView);
router.get('*', getViewsError);

module.exports= router;