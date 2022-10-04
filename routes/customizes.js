const router = require('express').Router();
const customizeController = require('../controllers/customizes');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../client/public/uploads/customizes/'));
		cb(null, path.resolve(__dirname, '../client/build/uploads/customizes/'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '_' + file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get('/get-all', customizeController.getAllSlideImages);
router.get('/get-all-documents', customizeController.getAllDocuments);
router.post('/upload-slide', upload.single('slideImage'), customizeController.postUploadSlideImage);
router.delete('/delete-slide/:id', customizeController.deleteImage);

module.exports = router;
