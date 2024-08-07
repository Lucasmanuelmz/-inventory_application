const {Router} = require('express');
const categoryRouter = Router()
const categoryController = require('../controllers/categoryController');

categoryRouter.get('/categories', categoryController.categoryCreateGet)
categoryRouter.get('/create', categoryController.categoryCreateGetCategories);
categoryRouter.post('/create', categoryController.categoryCreatePost);
categoryRouter.post('/delete', categoryController.deleteCategoryProduct);
categoryRouter.get('/:id/update', categoryController.updateCategory);
categoryRouter.post('/update', categoryController.updateCategoryDBPost);

module.exports = categoryRouter;