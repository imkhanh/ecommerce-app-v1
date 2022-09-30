const router = require('express').Router();
const categoryController = require('../controllers/categories');

router.get('/get-all', categoryController.getAllCategories);
router.get('/get-single/:id', categoryController.getSingleCategory);
router.post('/add-category', categoryController.postAddCategory);
router.patch('/edit-category/:id', categoryController.editCategory);
router.delete('/delete-category/:id', categoryController.deleteCategory);

module.exports = router;
