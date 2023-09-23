const express = require('express') ;
const {
    productsView,
    cartView,
    homeView,
    getViewsError
} = require('../controller/views.controller');

const viewsRouter = express.Router();


viewsRouter.get('/products', productsView);
viewsRouter.get('/cart/:cid', cartView);
viewsRouter.get('*', getViewsError);


module.exports = viewsRouter; 