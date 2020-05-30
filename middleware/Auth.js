module.exports = (req, res, next) => {
	if(!req.session.isLoggedIn) {
		req.flash('info', 'Please login to view this resource');
		return res.redirect('/users/login');
	}
	next();
}
