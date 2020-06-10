const mongoose				= require('mongoose');
const Booking				= require('../models/Booking.model.js')
const Requirement			= require('../models/Requirement.model.js');
const Housekeeper			= require('../models/Housekeeper.model.js');
const DOP					= require('dataobject-parser');
const CleaningService 		= require('../models/CleaningService.model.js');
const CookingService 		= require('../models/CookingService.model.js');
const BabySittingService	= require('../models/BabySittingService.model.js');
const ElderlyCareService	= require('../models/ElderlyCareService.model.js');
const dotenv				= require('dotenv');
dotenv.config();
const stripe				= require('stripe')(process.env.STRIPE_SECRET);

exports.getRequirement = (req, res, next) => {
	res.render('requirementForm', {user: req.session.user, title: "bookNow"});
}

exports.postRequirement = (req, res, next) => {
	let cleaningService,
	cookingService,
	babySittingService,
	elderlyCareService,
	requirementType = 0;

	if(req.body.cleaningService) {
		requirementType = requirementType | 1;
		cleaningService = {
			houseSize:				req.body.houseSize,
			numberOfPeople:			req.body.numberOfPeople,
			bathroomCleaning: 		req.body.bathroomCleaning,
			clothesIroning: 		req.body.clothesIroning,
			clothesWashingHand: 	req.body.clothesWashingHand,
			clothesWashingMachine: 	req.body.clothesWashingMachine,
			dusting: 				req.body.dusting,
			floorCleaning: 			req.body.floorCleaning,
			groceryShopping: 		req.body.groceryShopping,
			utensilCleaning: 		req.body.utensilCleaning
		};
	}

	if(req.body.cookingService) {
		requirementType = requirementType | 2;
		cookingService = {
			numberOfPeople:	req.body.numberOfPeople,
			veg: 			req.body.veg,
			nonVeg: 		req.body.nonVeg,
			breakFast: 		req.body.breakFast,
			lunch: 			req.body.lunch,
			dinner: 		req.body.dinner,
			foodPreference:	req.body.foodPreference
		};
	}

	if(req.body.babySittingService) {
		requirementType = requirementType | 4;
		babySittingService = {
			babyAge:				req.body.babyAge,
			babyGender:				req.body.babyGender,
			babyBathing: 			req.body.babyBathing,
			babyMassage: 			req.body.babyMassage,
			changingDiaper: 		req.body.changingDiaper,
			cleaningUtensilsOfBaby: req.body.cleaningUtensilsOfBaby,
			feeding: 				req.body.babyFeeding,
			motherMassage: 			req.body.motherMassage,
			preparingBabyFood: 		req.body.preparingBabyFood,
			preparingBabyForSleep: 	req.body.preparingBabyForSleep,
			takingBabyForAWalk: 	req.body.takingBabyForAWalk,
			washingBabyClothes: 	req.body.washingBabyClothes
		};
	}

	if(req.body.elderlyCareService) {
		requirementType = requirementType | 8;
		elderlyCareService = {
			elderAge:					req.body.elderAge,
			elderGender:				req.body.elderGender,
			isBedRidden:				req.body.isBedRidden,
			bathingSponging: 			req.body.bathingSponging,
			cleaningUtensilsOfElderly: 	req.body.cleaningUtensilsOfElderly,
			cookingForPatient: 			req.body.cookingForPatient,
			diaperChange: 				req.body.diaperChange,
			feeding: 					req.body.elderlyFeeding,
			givingMedicines: 			req.body.givingMedicines,
			injection: 					req.body.injection,
			massage: 					req.body.massage
		};
	}

	const requirement = new Requirement({
		userId:					req.body.userId,
		requirementType:		requirementType,
		religionPrefrence:		req.body.religionPreference,
		numberOfHoursDaily:		req.body.numberOfHoursDaily,
		approxSalary:			req.body.approxSalary,
		genderPreference:		req.body.genderPreference,
		agePreference:			req.body.agePreference,
		interviewAddress:		req.body.interviewAddress,
		comments:				req.body.comments,
		cleaningService:		cleaningService,
		cookingService:			cookingService,
		babySittingService:		babySittingService,
		elderlyCareService:		elderlyCareService
	});

	requirement.save()
	.then(result => {
		res.redirect('/requirements/shortlist/'+result._id);
	})
	.catch(err => {
		console.log(err);
	})
};

exports.getUpdateRequirement = (req, res, next) => {

}

exports.postUpdateRequirement = (req, res, next) => {
	let cleaningService,
	cookingService,
	babySittingService,
	elderlyCareService,
	requirementType = 0;

	if(req.body.cleaningService) {
		requirementType = requirementType | 1;
		cleaningService = {
			houseSize:				req.body.houseSize,
			numberOfPeople:			req.body.numberOfPeople,
			bathroomCleaning: 		req.body.bathroomCleaning,
			clothesIroning: 		req.body.clothesIroning,
			clothesWashingHand: 	req.body.clothesWashingHand,
			clothesWashingMachine: 	req.body.clothesWashingMachine,
			dusting: 				req.body.dusting,
			floorCleaning: 			req.body.floorCleaning,
			groceryShopping: 		req.body.groceryShopping,
			utensilCleaning: 		req.body.utensilCleaning
		};
	}

	if(req.body.cookingService) {
		requirementType = requirementType | 2;
		cookingService = {
			numberOfPeople:	req.body.numberOfPeople,
			veg: 			req.body.veg,
			nonVeg: 		req.body.nonVeg,
			breakFast: 		req.body.breakFast,
			lunch: 			req.body.lunch,
			dinner: 		req.body.dinner,
			foodPreference:	req.body.foodPreference
		};
	}

	if(req.body.babySittingService) {
		requirementType = requirementType | 4;
		babySittingService = {
			babyAge:				req.body.babyAge,
			babyGender:				req.body.babyGender,
			babyBathing: 			req.body.babyBathing,
			babyMassage: 			req.body.babyMassage,
			changingDiaper: 		req.body.changingDiaper,
			cleaningUtensilsOfBaby: req.body.cleaningUtensilsOfBaby,
			feeding: 				req.body.babyFeeding,
			motherMassage: 			req.body.motherMassage,
			preparingBabyFood: 		req.body.preparingBabyFood,
			preparingBabyForSleep: 	req.body.preparingBabyForSleep,
			takingBabyForAWalk: 	req.body.takingBabyForAWalk,
			washingBabyClothes: 	req.body.washingBabyClothes
		};
	}

	if(req.body.elderlyCareService) {
		requirementType = requirementType | 8;
		elderlyCareService = {
			elderAge:					req.body.elderAge,
			elderGender:				req.body.elderGender,
			isBedRidden:				req.body.isBedRidden,
			bathingSponging: 			req.body.bathingSponging,
			cleaningUtensilsOfElderly: 	req.body.cleaningUtensilsOfElderly,
			cookingForPatient: 			req.body.cookingForPatient,
			diaperChange: 				req.body.diaperChange,
			feeding: 					req.body.elderlyFeeding,
			givingMedicines: 			req.body.givingMedicines,
			injection: 					req.body.injection,
			massage: 					req.body.massage
		};
	}

	Requirement.findOne(req.body.reqId)
	.then(result => {
		result.requirementType		= requirementType;
		result.religionPrefrence	= req.body.religionPreference;
		result.numberOfHoursDaily	= req.body.numberOfHoursDaily;
		result.approxSalary			= req.body.approxSalary;
		result.genderPreference		= req.body.genderPreference;
		result.agePreference		= req.body.agePreference;
		result.interviewAddress		= req.body.interviewAddress;
		result.comments				= req.body.comments;
		result.cleaningService		= cleaningService;
		result.cookingService		= cookingService;
		result.babySittingService	= babySittingService;
		result.elderlyCareService	= elderlyCareServic;
		return result.save();
	})
	.then(result => {
		req.redirect('/requirements/dashboard');
	})
	.catch(err => console.log(err));
}

exports.deleteRequirement = (req, res, next) => {
	Requirement.findByIdAndRemove({_id: req.params.reqId})
	.then(result => {
		console.log(result);
		const response = {
			message: "Requirement deleted successfully!",
			id: result._id
		}
		return res.status(200).send(response);
	})
	.catch(err => {
		return res.status(500).send(err);
	});
}

exports.shortlist = (req, res, next) => {
	let reqType = [];
	Requirement.findOne({_id: req.params.reqId, userId: req.session.user._id})
	.then(result => {
		let cleaningService;
		let cookingService;
		let elderlyCareService;
		let babySittingService;
		if(result)  {
			if(result.requirementType & 1) {
				reqType.push('Cleaner');
				cleaningService = {
					bathroomCleaning: 		result.cleaningService.bathroomCleaning,
					clothesIroning: 		result.cleaningService.clothesIroning,
					clothesWashingHand: 	result.cleaningService.clothesWashingHand,
					clothesWashingMachine: 	result.cleaningService.clothesWashingMachine,
					dusting: 				result.cleaningService.dusting,
					floorCleaning: 			result.cleaningService.floorCleaning,
					groceryShopping: 		result.cleaningService.groceryShopping,
					utensilCleaning: 		result.cleaningService.utensilCleaning
				}
				cleaningService = DOP.untranspose({cleaningService: cleaningService});
			}
			if(result.requirementType & 2) {
				reqType.push('Cook');
				cookingService = {
					veg: 			result.cookingService.veg,
					nonVeg: 		result.cookingService.nonVeg,
					breakFast: 		result.cookingService.breakFast,
					lunch: 			result.cookingService.lunch,
					dinner: 		result.cookingService.dinner,
				}
				cookingService = DOP.untranspose({cookingService: cookingService});
			}
			if(result.requirementType & 4) {
				reqType.push('Nanny');
				babySittingService = {
					babyBathing: 			result.babySittingService.babyBathing,
					babyMassage: 			result.babySittingService.babyMassage,
					changingDiaper: 		result.babySittingService.changingDiaper,
					cleaningUtensilsOfBaby: result.babySittingService.cleaningUtensilsOfBaby,
					feeding: 				result.babySittingService.babyFeeding,
					motherMassage: 			result.babySittingService.motherMassage,
					preparingBabyFood: 		result.babySittingService.preparingBabyFood,
					preparingBabyForSleep: 	result.babySittingService.preparingBabyForSleep,
					takingBabyForAWalk: 	result.babySittingService.takingBabyForAWalk,
					washingBabyClothes: 	result.babySittingService.washingBabyClothes
				}
				babySittingService = DOP.untranspose({babySittingService: babySittingService});
			}
			if(result.requirementType & 8) {
				reqType.push('Elderly Care');
				elderlyCareService = {
					bathingSponging: 			result.elderlyCareService.bathingSponging,
					cleaningUtensilsOfElderly: 	result.elderlyCareService.cleaningUtensilsOfElderly,
					cookingForPatient: 			result.elderlyCareService.cookingForPatient,
					diaperChange: 				result.elderlyCareService.diaperChange,
					feeding: 					result.elderlyCareService.elderlyFeeding,
					givingMedicines: 			result.elderlyCareService.givingMedicines,
					injection: 					result.elderlyCareService.injection,
					massage: 					result.elderlyCareService.massage
				}
				elderlyCareService = DOP.untranspose({elderlyCareService: elderlyCareService});
			}
			const query = {...cleaningService, ...cookingService, ...babySittingService, ...elderlyCareService};
			
			return Housekeeper.find(query);
		}
		else res.redirect('/requirements/dashboard');
	})
	.then(housekeepers => {
		res.render('profile', {
			housekeepers: housekeepers,
			reqId: req.params.reqId,
			user: req.session.user,
			title:"bookNow",
			reqType: reqType.join()
		});
	})
	.catch(err => {
		console.log(err);
	});
};

exports.postCheckout = (req, res, next) => {
	let reqType = req.body.reqType.split(",");
	let housekeeper;
	let stripeSession;
	Housekeeper.findOne({_id: req.body.housekeeperId})
	.then(result => {
		housekeeper = result;
		return stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			success_url: req.protocol + '://' + req.get('host') + '/index/successbooking',
			cancel_url: req.protocol + '://' + req.get('host') + '/index/cancelbooking',
			customer_email: req.session.user.email,
			mode: "payment",
			submit_type: "book",
			line_items: [{
				quantity: 1,
				price_data: {
					currency: 'inr',
					product_data: {
						name: result.firstName+" "+result.lastName,
						description: req.body.reqType+ "\n" +result
									.experience
									.description.join('\n'),
						images: [result.picture]
					},
					unit_amount: reqType.length*150000
				}
			}],
			metadata: {
				housekeeperId: result._id.toString(),
				reqId: req.body.reqId.toString()
			}
		});
	})
	.then(session => {
		stripeSession = session;
		let booking = new Booking({
			_id: mongoose.Types.ObjectId(),
			userId: req.session.user._id,
			requirementId: req.body.reqId,
			housekeeperId: housekeeper._id
		});
		return booking.save();
	})
	.then(booking => {
		req.session.bookingId = booking._id;
		res.render('checkout', {
			stripeSessionId: stripeSession.id,
			user: req.session.user,
			housekeeper: housekeeper,
			reqId: req.body.reqId,
			title: "bookNow",
			payment: reqType.length*1500
		});
	})
	.catch(err => {
		console.log(err);
	})
}

exports.getDashboard = (req, res, next) => {
	Requirement.find({userId: req.session.user._id})
	.sort({dateAdded: -1})
	.then(result => {
		console.log(result);
		return res.render('dashboard', {requirements: result});
	})
	.catch(err => {
		console.log(err);
	});
}
