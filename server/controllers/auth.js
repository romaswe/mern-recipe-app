const crypto = require('crypto');
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

		sendToken(user, 201, res);
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

		if (user.role.includes('disabled')) {
			return next(new ErrorResponse('User account is disabled', 401));
		}

		if (!user) {
			return next(new ErrorResponse('Invalid credentials (Email)', 401));
		}

		const isMatch = await user.matchPasswords(password);
		if (!isMatch) {
			return next(
				new ErrorResponse('Invalid credentials (Password)', 401)
			);
		}

		sendToken(user, 200, res);
	} catch (error) {
		return next(error);
	}
};

exports.forgotpassword = async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return next(new ErrorResponse('Email could not be sent', 404));
		}

		const resetToken = user.getResetPasswordToken();

		await user.save();

		const resetUrl = `${process.env.PASSWORD_RESET_URL}${resetToken}`;
		console.log(`Resetpasswordlink for user ${user.email}: ${resetUrl}`);
		res.status(200).json({
			success: true,
			data: `Check logfile for ${user.email}`,
		});
	} catch (error) {
		return next(error);
	}
};

exports.resetpassword = async (req, res, next) => {
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resetToken)
		.digest('hex');

	try {
		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() },
		});

		if (!user) {
			return next(new ErrorResponse('Invalid Reset Token', 400));
		}

		user.password = req.body.password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();

		res.status(201).json({
			success: true,
			data: 'Password Reset Success',
		});
	} catch (error) {
		return next(error);
	}
};

const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken();
	res.status(statusCode).json({ success: true, token });
};
