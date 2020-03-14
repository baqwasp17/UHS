const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Housekeeper = require('../models/Housekeeper.model');

router.get("/", (req, res, next) => {
	res.status(200).json({
		message: "handling GET requests to /housekeepers"
	});
});

/*PROTECTED*/
router.post("/", (req, res, next) => {
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
router.get('/:housekeeperId', (req, res, next) => {
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
router.delete('/:housekeeperId', (rev, res, next) => {
	res.status(200).json({
		message: "Handling DELETE requests to /housekeepers"
	});
});

/*PROTECTED*/
router.patch('/:housekeeperId', (rev, res, next) => {
	res.status(200).json({
		message: "Handling PATCH requests to /housekeepers"
	});
});

module.exports = router;
