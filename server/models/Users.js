const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide username'],
	},
	email: {
		type: String,
		required: [true, 'Please provide email address'],
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email',
		],
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		select: false,
	},
	role: [{ type: String }], // Roles can be, viewer(can only se recipies), user(can add to crocery list) or admin(can add new recipies)
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});
// Function to hash a single password
async function hashPassword(password) {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
}

// Pre-save hook to hash the password before saving
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	this.password = await hashPassword(this.password);
	next();
});

// Function to hash passwords for multiple users
async function hashPasswords(users) {
	return Promise.all(
		users.map(async (user) => {
			user.password = await hashPassword(user.password);
			return user;
		})
	);
}

// Function to insert multiple users with hashed passwords
async function insertUsers(users) {
	const hashedUsers = await hashPasswords(users);
	return User.insertMany(hashedUsers);
}

UserSchema.methods.matchPasswords = async function (password) {
	return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
	//TODO: change role to return full array when frontend is fixed
	return jwt.sign(
		{ id: this._id, role: this.role[0], username: this.username },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRE,
		}
	);
};

UserSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(35).toString('hex');

	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.resetPasswordExpire = Date.now() + 30 * (60 * 1000); // Expiers 30min from now
	return resetToken;
};

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);
module.exports = {
	User,
	insertUsers,
};
