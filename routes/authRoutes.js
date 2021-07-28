const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'],
		})
	);

	//second route handler

	app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
		res.redirect('/surveys');
	}); //

	app.get('/api/logout', (req, res) => {
		req.logout(); //kills the coookie
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
// hello this is the change