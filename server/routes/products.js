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

router.get('/get-all', productController.getAll);
router.get('/get-single-product/:id', productController.getSingleProduct);
router.post('/create-product', upload.any(), productController.createProduct);
router.patch('/update-product/:id', productController.updateProduct);
router.delete('/delete-product/:id', productController.deleteProduct);

router.post('/add-wish', productController.addToWishList);
router.post('/add-cart', productController.addToCart);
router.post('/add-review', productController.addReview);
router.post('/delete-review', productController.deleteReview);

module.exports = router;
