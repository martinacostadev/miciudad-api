const jwt = require('jsonwebtoken');

const config = require('../database/config');

const generateJWt = (uid = '') => {
	return new Promise((resolve, reject) => {
		const payload = { uid };

		jwt.sign(
			payload,
			config.jwt.key,
			{
				expiresIn: '24h',
			},
			(error, token) => {
				if (error) {
					console.log(error);
					reject('The token could not be generated');
				} else {
					resolve(token);
				}
			},
		);
	});
};

module.exports =  generateJWt;