const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/create', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.get('/', productController.getProducts);


module.exports = router;
