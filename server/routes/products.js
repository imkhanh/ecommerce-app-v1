const router = require('express').Router();
const productController = require('../controllers/products');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../client/public/uploads/products/'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '_' + file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get('/get-all', productController.getAllProducts);
router.get('/get-single/:id', productController.getSingleProduct);
router.get('/get-list-related/:id', productController.getListRelated);
router.post('/create-product', upload.any(), productController.postAddProduct);
router.patch('/update-product/:id', productController.patchUpateProduct);
router.delete('/delete-product/:id', productController.deletProduct);

router.post('/add-wish', productController.postAddToWish);
router.post('/add-cart', productController.postAddToCart);
router.post('/add-review', productController.postAddReview);
router.post('/delete-review', productController.postDeleteReview);

module.exports = router;
