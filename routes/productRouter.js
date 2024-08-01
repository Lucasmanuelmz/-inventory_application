const {Router} = require('express');
const productController = require('../controllers/productControllers');
const productRouter = Router();
const asyncHandler = require('express-async-handler');

productRouter.get('/create',asyncHandler(productController.productCreateGet));
productRouter.post('/create',asyncHandler(productController.productCreatePost));
productRouter.get('/', asyncHandler(productController.displayAllProducts))

module.exports = productRouter;