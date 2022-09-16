const router = require('express').Router();
const categoryController = require('../controllers/categories');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../client/public/uploads/categories/'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '_' + file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get('/get-all', categoryController.getAll);
router.get('/get-single/:id', categoryController.getSingleCategory);
router.post('/create-category', upload.single('image'), categoryController.createCategory);
router.patch('/update-category/:id', categoryController.updateCategory);
router.delete('/delete-category/:id', categoryController.deleteCategory);

module.exports = router;
