module.exports.login = (req, res) => {
	res.render('auth/login', { message: req.flash('loginMessage') })
}

module.exports.signup = (req, res) => {
	res.render('auth/register', { message: req.flash('signupMessage') })
}

module.exports.profile = (req, res) => {
	res.render('auth/profile', {user : req.user})
}

module.exports.logout = (req, res) => {
	 req.logout();
     res.redirect('/login');
}