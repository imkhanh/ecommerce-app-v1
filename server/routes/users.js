const router = require('express').Router();
const userController = require('../controllers/users');

router.get('/get-all', userController.getAllUsers);
router.get('/get-single-user/:id', userController.getSingleUser);
router.patch('/edit-user/:id', userController.editUser);

router.post('/change-password', userController.changePasswordUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;
