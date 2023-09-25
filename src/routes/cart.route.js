const express = require('express');
const { isAdmin,isUserPrimium,goToLogin } = require("../middlewares/auth.middleware");

const {
    getAll,
    newCart,
    getCartById,
    addPorductToCart,
    deleteCart,
    deleteProductFromCart,
    updateQuantity,
    updateCart,
    purchase,
    getPurchase,
    deletePurchase,
    getCartError 
} = require('../controller/cart.controller');

const router = new express.Router(); 

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get("/",goToLogin, isAdmin, getAll);   
router.post("/",goToLogin, newCart);
router.get("/:id",goToLogin,isAdmin, getCartById);
router.post("/:cid/product/:pid",goToLogin,isUserPrimium, addPorductToCart);
router.delete("/:id",goToLogin,isAdmin, deleteCart);
router.delete("/:cid/product/:pid",goToLogin, deleteProductFromCart);
router.put("/:cid/product/:pid",goToLogin, updateQuantity);
router.put("/:cid",goToLogin, updateCart);
router.get('/:cid/purchase',goToLogin, isUserPrimium, purchase);
router.get('/:cid/purchases',goToLogin, isAdmin, getPurchase);
router.delete('/:cid/purchases', goToLogin,isAdmin, deletePurchase);
router.get('*', getCartError);

module.exports = router;


