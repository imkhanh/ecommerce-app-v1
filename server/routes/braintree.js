const router = require('express').Router();
const braintreeController = require('../controllers/braintree');

router.get('/get-token', braintreeController.generateToken);
router.post('/payment', braintreeController.paymentProcess);

module.exports = router;
