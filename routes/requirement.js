const express = require('express');
const router = express.Router();

/*PROTECTED*/
router.get('/', (req, res, next) => {

});

/*PROTECTED*/
router.post('/', (req, res, next) => {

});

/*PROTECTED*/
router.delete('/:requirementId', (req, res, next) => {
	const requirementId = req.params.requirementId;
});

/*PROTECTED*/
router.patch('/:requirementId', (req, res, next) => {
	const requirementId = req.params.requirementId;
});

module.exports = router;
