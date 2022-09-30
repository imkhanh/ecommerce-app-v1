const router = require('express').Router();
const productController = require('../controllers/products');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../client/public/uploads/products/'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '_' + file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get('/get-all', productController.getAllProducts);
router.get('/get-single-product/:id', productController.getSingleProduct);
router.get('/get-list-related/:id', productController.getListRelated);
router.post('/add-product', upload.any(), productController.postAddProduct);
router.post('/edit-product', upload.any(), productController.editProduct);
router.delete('/delete-product/:id', productController.deletProduct);

router.post('/add-review', productController.postAddReview);
router.post('/delete-review', productController.postDeleteReview);

router.post('/search/filters', productController.getProductsByFilters);

module.exports = router;
