const express 			= require('express');
const router 			= express.Router();
const authenticate 		= require('../middleware/Auth.js');
const indexController 	= require('../controllers/Index.controller.js')

// Welcome Page
router.get('/', indexController.getWelcome);

// services temp
router.get('/services', indexController.getServices);

// Dashboard
/*PROTECTED*/
router.get('/dashboard', authenticate, indexController.getDashboard);

module.exports = router;
