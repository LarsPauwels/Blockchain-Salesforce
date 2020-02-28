const express = require('express');
const router = express.Router();
const productController = require("../controllers/products");

/* Product routes GET */
router.get('/products', productController.getProducts);
router.get('/products/mine', productController.mineProduct);
router.get('/products/sender/:sender', productController.productBySender);
router.get('/products/name/:name', productController.productByName);
router.get('/products/id/:id', productController.productByIndex);

/* Product routes POST */
// router.get('/products/:company', nodeController.getProductsByCompany);
router.post('/products/create', productController.createProduct);

module.exports = router;
