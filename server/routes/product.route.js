const router = require('express').Router();
const productController = require('../controllers/product.controller');
const multer = require('multer');

const storage = {};

const upload = multer({ storage: storage });

router.get('/all-product', productController.getAllProduct);
router.get('/single-product/:id', productController.getSingleProduct);
router.post('/create-product', upload.any(), productController.createProduct);
router.patch('/update-product/:id', productController.updateProduct);
router.delete('/delete-product/:id', productController.deleteProduct);

module.exports = router;
