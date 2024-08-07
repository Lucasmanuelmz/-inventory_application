const {Router} = require('express');
const productController = require('../controllers/productControllers');
const productRouter = Router();
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const imageStorage= require('../midlewares/uploads');

const upload = multer({storage: imageStorage})

productRouter.get('/create', asyncHandler(productController.productCreateGet));
productRouter.post('/create', upload.single('photo'), asyncHandler(productController.productCreatePost));
productRouter.get('/all-products', productController.productAdminGet);
productRouter.get('/:id/edit', productController.renderViewProductGetUpdate);
productRouter.post('/product/delete', productController.deleteProductInTable);
productRouter.post('/update', productController.updateProductInTable)

module.exports = productRouter;