const express= require('express')
const CartView = express.Router()
const { isUser, isAdmin } = require("../middlewares/auth.middleware");
const {cartView,getViewsError} = require('../controller/views.controller');
  
CartView.use(express.json())
CartView.use(express.urlencoded({extended:true}))

CartView.get('/', cartView)
CartView.get('*', getViewsError)

module.exports= CartView