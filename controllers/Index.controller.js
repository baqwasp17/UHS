exports.getWelcome = (req, res, next) => {
	console.log(req.session.user);
	res.render('welcome', {user: req.session.user});
};

exports.getServices = (req, res, next) => {
	console.log(req.user);
	res.render('services', {user: req.session.user});
};

exports.getDashboard = (req, res, next) => {
	res.render('dashboard', {
		user: req.session.user
	})
};
