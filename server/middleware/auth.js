const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const { User } = require('../models/Users');
const roles = require('../utils/roleHandler');

exports.protect = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(
			new ErrorResponse('Not authorized to access this route', 401)
		);
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.id);

		if (!user) {
			return next(new ErrorResponse('No user found with this id', 404));
		}

		if (user.role.includes(roles.DISABLED)) {
			return next(new ErrorResponse('User account is disabled', 401));
		}

		if (req.method !== 'GET') {
			if (user.role.includes(roles.VIEWER)) {
				return next(
					new ErrorResponse(
						'Viewers can only fetch and view data',
						401
					)
				);
			}
		}

		req.user = user;

		next();
	} catch (err) {
		return next(
			new ErrorResponse('Not authorized to access this router', 401)
		);
	}
};

exports.adminProtect = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(
			new ErrorResponse('Not authorized to access this route', 401)
		);
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.id);

		if (!user) {
			return next(new ErrorResponse('No user found with this id', 404));
		}

		if (!user.role.includes(roles.ADMIN)) {
			next(
				new ErrorResponse(
					'Not authorized need to be admin to access this router',
					401
				)
			);
		}
		req.user = user;

		next();
	} catch (err) {
		return next(
			new ErrorResponse('Not authorized to access this router', 401)
		);
	}
};
