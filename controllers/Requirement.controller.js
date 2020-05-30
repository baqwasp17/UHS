const Requirement			= require('../models/Requirement.model.js');
const CleaningService 		= require('../models/CleaningService.model.js');
const CookingService 		= require('../models/CookingService.model.js');
const BabySittingService	= require('../models/BabySittingService.model.js');
const ElderlyCareService	= require('../models/ElderlyCareService.model.js');

exports.getRequirement = (req, res, next) => {
	res.render('requirementForm', {user: req.session.user});	
}

exports.postRequirement = (req, res, next) => {
	console.log(req.body);
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
		console.log(result);
	})
	.catch(err => {
		console.log(err);
	})
};

exports.patchRequirement = (req, res, next) => {

};

exports.deleteRequirement = (req, res, next) => {
	
}

exports.testRequirement = (req, res, next) => {
	Requirement.find()
	.then(result => {
		console.log(result);
		return res.render('myhome', {requirements: result});
	})
	.catch(err => {
		console.log(err);
	});
}
