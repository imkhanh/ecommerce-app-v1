const router = require('express').Router();
const categoryController = require('../controllers/Category');

router.get('/all-category', categoryController.getAllCategory);
router.get('/single-category/:id', categoryController.getSingleCategory);
router.post('/create-category', categoryController.createCategory);
router.patch('/update-category/:id', categoryController.updateCategory);
router.patch('/delete-category/:id', categoryController.deleteCategory);

module.exports = router;
