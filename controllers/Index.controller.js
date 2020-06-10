exports.getWelcome = (req, res, next) => {
	console.log(req.session.user);
	res.render('welcome', {user: req.session.user, title: "home"});
};

exports.getServices = (req, res, next) => {
	console.log(req.user);
	res.render('services', {user: req.session.user, title: "services"});
};

exports.getDashboard = (req, res, next) => {
	res.render('dashboard', {
		user: req.session.user
	})
};
