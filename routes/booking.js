const express = require('express');
const router = express.Router();

/*PROTECTED*/
router.get('/', (req, res, next) => {

});

/*PROTECTED*/
router.post('/', (req, res, next) => {

});

/*PROTECTED*/
router.delete('/:bookingId', (req, res, next) => {
	const bookingId = req.params.bookingId;
});

module.exports = router;
