const express 			= require('express')
	, userController	= require('../controllers/User.controller.js')
	, authenticate		= require('../middleware/Auth.js')
	, router 			= express.Router();

// Login Page
router.get('/login', userController.getLogin);

// Login
router.post('/login', userController.postLogin);

// Register Page
router.get('/register', userController.getRegister);

// Register
router.post('/register', userController.postRegister);

// Logout
router.get('/logout', userController.getLogout);

// Reset Page
router.get('/reset/:token', userController.getReset);

// Reset Password
router.post('/reset', userController.postReset);

// new Password
router.post('/newPassword', userController.postNewPassword);

/*PROTECTED*/
router.patch('/:userId', authenticate, userController.patchUser);

/*PROTECTED*/
router.delete('/:userId', authenticate, userController.deleteUser);

module.exports = router;
