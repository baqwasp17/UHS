const express 		= require('express');
const reqController = require('../controllers/Requirement.controller.js');
const authenticate 	= require('../middleware/Auth.js');
const router 		= express.Router();

// get requirement
router.get('/getRequirement', authenticate, reqController.getRequirement);

// post requirement
router.post('/postRequirement', authenticate, reqController.postRequirement);

// get update requirememnts
router.get('/updateRequirement/:reqId', authenticate, reqController.getUpdateRequirement);

// patch update requirement
router.post('/updateRequirement', authenticate, reqController.postUpdateRequirement);

// delete requirement
router.delete('/deleteRequirement/:reqId', authenticate, reqController.deleteRequirement);

// shortlist
router.get('/shortlist/:reqId', authenticate, reqController.shortlist);

router.post('/checkout', authenticate, reqController.postCheckout);

router.get('/dashboard', authenticate, reqController.getDashboard);
module.exports = router;
