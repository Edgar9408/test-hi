const { Router } = require("express");
const router = Router();

//controladores
const { createProduct, getProducts, getOneProduct, deleteProduct, updateProduct, getProductByUser } = require('../controllers/products.controller')

// /api/products
router.post("/", createProduct);
router.get("/", getProducts);

// /api/products/:id
router.get("/:id", getOneProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

// /api/products/user/:id
router.get("/user/:id", getProductByUser);

module.exports = router;