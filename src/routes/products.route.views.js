const express = require("express");
const {productsView,getViewsError} = require('../controller/views.controller');
const router = express.Router();

router.get("/", productsView);
router.get("*", getViewsError); 

module.exports = router;

  
