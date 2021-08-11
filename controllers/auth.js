const User = require('../models/Users');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const user = await User.create({
			username,
			email,
			password,
		});

		res.status(201).json({
			success: true,
			user,
		});
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(
			new ErrorResponse('Please provide email and password', 400)
		);
	}

	try {
		const user = await User.findOne({ email }).select('+password');

		if (!user) {
			return next(new ErrorResponse('Invalid credentials (Email)', 401));
		}

		const isMatch = await user.matchPasswords(password);
		if (!isMatch) {
			return next(
				new ErrorResponse('Invalid credentials (Password)', 401)
			);
		}

		res.status(200).json({
			success: true,
			token: 'someToken',
		});
	} catch (error) {
		return next(error);
	}
};

exports.forgotpassword = (req, res, next) => {
	res.send('Forgot password Route');
};

exports.resetpassword = (req, res, next) => {
	res.send('Reset Password Route');
};
