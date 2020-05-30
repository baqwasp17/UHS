const express 		= require('express');
const reqController = require('../controllers/Requirement.controller.js');
const authenticate 	= require('../middleware/Auth.js');
const router 		= express.Router();

// get requirement
router.get('/getRequirement', authenticate, reqController.getRequirement);

// post requirement
router.post('/postRequirement', authenticate, reqController.postRequirement);

// patch requirement
router.patch('/updateRequirement/:reqId', authenticate, reqController.patchRequirement);

// delete requirement
router.patch('/deleteRequirement/:reqId', authenticate, reqController.deleteRequirement);

router.get('/dashboard', authenticate, reqController.testRequirement);
module.exports = router;
