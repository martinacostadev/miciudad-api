const jwt = require('jsonwebtoken');

const config = require('../database/config');
const User = require('../models/user.model');

const validateJWT = async (req, res, next) => {
	const token = req.header('auth-token');

	if (!token) {
		return res.status(401).json({
			message: 'The request needs a token',
		});
	}

	try {
		const { uid }  = jwt.verify(token, config.jwt.key);

		const user = await User.findById(uid);

		if (!user) {
			return res.status(401).json({
				message: 'Invalid token - user does not exist DB',
			});
		}

		if (!user.state) {
			return res.status(401).json({
				message: 'Invalid token - user with status: false',
			});
		}

		req.user = user;
		next();

	} catch (error) {
		console.log(error);
		return res.status(401).json({
			message: 'Invalid token',
		});
	}
};

module.exports = validateJWT;