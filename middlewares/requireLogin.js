module.exports = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: 'you must be logged in!' });
	}
	next();
};
// hello this is the change