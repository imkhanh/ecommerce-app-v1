const router = require('express').Router();
const categoryController = require('../controllers/Category');

router.get('/get-all', categoryController.getAllCategory);
router.get('/get-single/:id', categoryController.getSingleCategory);
router.post('/create-category', categoryController.createCategory);
router.patch('/update-category/:id', categoryController.updateCategory);
router.patch('/delete-category/:id', categoryController.deleteCategory);

module.exports = router;
