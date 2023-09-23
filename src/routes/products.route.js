const express = require("express");
const { isUser, isAdmin } = require("../middlewares/auth.middleware");
// const {getProducts,
//   getProductsById,
//   postProduct,
//   postManyProducts,
//   delProductById,
//   putProductById,
//   getProductError} = require ('../controller/products.controller')

  const {
    getWithQuerys,
    getProductById,
    addProduct,
    addManyProducts,
    deleteProduct,
    updateProduct,
    getProductError
   } = require ('../controller/products.controller')

const { Router } = express;
const router = new Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", getWithQuerys);
router.get("/:id", isAdmin, getProductById);  
router.post("/", isAdmin, addProduct);
router.post("/many", isAdmin, addManyProducts);
router.delete("/:id", isAdmin, deleteProduct);
router.put("/:id", isAdmin,updateProduct);
router.get("*", getProductError);

module.exports = router;
