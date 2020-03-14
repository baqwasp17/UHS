const express = require('express');
const router = express.Router();

router.post('/login', (req, res, next) => {

});

router.post('/register', (req, res, next) => {
	
});

/*PROTECTED*/
router.patch('/:userId', (req, res, next) =>{
	const userId = req.params.userId;
});

/*PROTECTED*/
router.delete('/:userId', (req, res, next) => {
	const userId = req.params.userId;
});

module.exports = router;
