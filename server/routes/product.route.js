const router = require('express').Router();
const productController = require('../controllers/product.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../client/public/uploads/products/'));
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '-' + Date.now());
	},
});

const upload = multer({ storage: storage });

router.get('/all-product', productController.getAllProduct);
router.get('/single-product/:id', productController.getSingleProduct);
router.post('/create-product', upload.any(), productController.createProduct);
router.patch('/update-product/:id', productController.updateProduct);
router.patch('/delete-product/:id', productController.deleteProduct);

module.exports = router;
