const express 		= require('express');
const mongoose 		= require('mongoose');
const authenticate 	= require('../middleware/Auth.js')
const router 		= express.Router();

const Housekeeper 	= require('../models/Housekeeper.model.js');

router.get("/", (req, res, next) => {
	res.status(200).json({
		message: "handling GET requests to /housekeepers"
	});
});

/*PROTECTED*/
router.post("/", authenticate, (req, res, next) => {
	const housekeeper = new Housekeeper({
		_id: new mongoose.Types.ObjectId(),
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		gender: req.body.gender,
		verificationStatus: req.body.verificationStatus,
		services: req.body.services,
		experience: req.body.experience,
		picture: req.body.picture,
		minSalary: req.body.minSalary
	});
	housekeeper.save()
	.then(result => console.log(result))
	.catch(err => console.log(err));
	res.status(200).json({
	});
});

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
