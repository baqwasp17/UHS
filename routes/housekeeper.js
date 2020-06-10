const express 		= require('express');
const authenticate 	= require('../middleware/Auth.js')
const router 		= express.Router();
const hkController	= require('../controllers/Housekeeper.controller.js');
const Housekeeper 	= require('../models/Housekeeper.model.js');

router.get("/", authenticate, hkController.getHousekeeper);

/*PROTECTED*/
router.post("/", authenticate, hkController.postHousekeeper);

/*PROTECTED*/
router.get('/:housekeeperId', authenticate, (req, res, next) => {
	const id = req.params.housekeeperId;
	Housekeeper.findById(id)
	.exec()
	.then(doc => {
		console.log(doc);
		res.status(200).json(doc);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	});
});

/*PROTECTED*/
router.delete('/:housekeeperId', authenticate, (rev, res, next) => {
	res.status(200).json({
		message: "Handling DELETE requests to /housekeepers"
	});
});

/*PROTECTED*/
router.patch('/:housekeeperId', authenticate, (rev, res, next) => {
	res.status(200).json({
		message: "Handling PATCH requests to /housekeepers"
	});
});

module.exports = router;
