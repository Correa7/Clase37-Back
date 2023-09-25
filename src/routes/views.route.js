const express = require('express');
const {
    productsView,
    cartView,
    homeView,
    getViewsError
} = require('../controller/views.controller');

const router = express.Router();


router.get('/products', productsView);
router.get('/cart/:cid', cartView);
router.get('*', getViewsError);


module.exports = router; 