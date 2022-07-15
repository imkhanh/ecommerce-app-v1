const userModel = require('../models/user.model');

module.exports = isAuth = (req, res, next) => {
	try {
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = isAdmin = (req, res, next) => {
	try {
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};
