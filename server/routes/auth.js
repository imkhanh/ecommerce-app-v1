const router = require('express').Router();
const authController = require('../controllers/auth');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

module.exports = router;
