const orderController = require('../controllers/orders');

const router = require('express').Router();

router.get('/get-all', orderController.getAllOrders);
router.get('/order-by-user/:id', orderController.getSingleOrder);
router.post('/create-order', orderController.createOrder);
router.patch('/update-order/:id', orderController.updateOrder);
router.delete('/delete-order/:id', orderController.deleteOrder);

module.exports = router;
