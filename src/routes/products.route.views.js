const express = require("express");
const productViews = express.Router();
const {productsView,getViewsError} = require('../controller/views.controller');

productViews.get("/", productsView);
productViews.get("*", getViewsError); 

module.exports = productViews;

  
