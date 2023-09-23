const express = require('express')
const { isUser, isAdmin } = require("../middlewares/auth.middleware");
// const { getCart, postCart, getCartById, postCartProductsById, delCartById, delCartProductById, putCartById, putCartProductsById, getCartError,purchase} = require ('../controller/cart.controller')
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

const { Router } = express
const router = new Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get("/", getAll);  
router.post("/", newCart);
router.get("/:id", getCartById);
router.post("/:cid/product/:pid", addPorductToCart)
router.delete("/:id", deleteCart)
router.delete("/:cid/product/:pid", deleteProductFromCart)
router.put("/:cid/product/:pid", updateQuantity)
router.put("/:cid", updateCart)
router.get('/:cid/purchase', purchase)
router.get('/:cid/purchases', getPurchase)
router.delete('/:cid/purchases', deletePurchase)
router.get('*', getCartError)

// router.get('/', isAdmin, getCart)
// router.get('/:cId', isAdmin, getCartById)
// router.post('/', isAdmin, postCart)
// router.post('/:cId/product/:pId', isAdmin, postCartProductsById)
// router.delete('/:cId', isAdmin, delCartById)
// router.delete('/:cId/product/:pId', isAdmin, delCartProductById)
// router.put('/:cId', isAdmin, putCartById)
// router.put('/:cId/product/:pId', isAdmin, putCartProductsById)

// router.get('/:cId/purchase', purchase)

// router.get('*', getCartError)

module.exports = router


