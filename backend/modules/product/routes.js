// declare express router
const express = require('express');
const router = express.Router();

const productController = require('./controller');

// declare routes to create, read, update and delete user
router.get('/search/:keyword', productController.search);
router.post('/purchase/:id', productController.purchase);
router.post('/', productController.createProduct);
router.get('/', productController.getAllproducts);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// export routes
module.exports = router;