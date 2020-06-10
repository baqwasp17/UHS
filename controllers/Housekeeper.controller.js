const Housekeeper 	= require('../models/Housekeeper.model.js');

exports.getHousekeeper = (req, res, next) => {
	res.status(200).json({
		message: "handling GET requests to /housekeepers"
	});
};

exports.postHousekeeper = (req, res, next) => {
	//TODO
	const housekeeper = new Housekeeper({
		serviceType:		req.body.serviceType,
		firstName: 			req.body.firstName,
		lastName: 			req.body.lastName,
		gender: 			req.body.gender,
		noOfHoursCanWork: 	req.body.noOfHoursCanWork,
		housekeeperAge:		req.body.housekeeerAge,
		liveIn:				req.body.liveIn,
		nativePlace:		req.body.nativePlace,
		location:			req.body.location,
		verifiedDocs: 		req.body.verifiedDocs,
		languages:			req.body.languages,
		cleaningService: 	cleaningService,
		cookingService:		cookingService,	
		babySittingService:	babySittingService,
		elderlyCareService:	elderlyCareService,
		experience:			experience
	});
	housekeeper.save()
	.then(result => console.log(result))
	.catch(err => console.log(err));
	res.status(200).json({
	});
};
