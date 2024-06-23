const mongoose = require('mongoose');
const { User } = require('../models/Users');
const createMockData = require('../utils/testData');
const roles = require('../utils/roleHandler');

const url = process.env.DATABASE_DOMAIN;
console.log(url);
const connectDB = async () => {
	await mongoose
		.connect(url, {
			auth: { authSource: 'admin' },
			user: process.env.DATABASE_USERNAME,
			pass: process.env.DATABASE_PASSWORD,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: process.env.DATABASE_NAME,
		})
		.catch((error) => {
			console.log(error);
			console.log(`MongoDB error ${url}`);
		})
		.finally(() => {
			console.log(`MongoDB Connected to ${url}`);
			setupinitialData();
		});
};

const setupinitialData = async () => {
	// create admin user if no admin user exists
	try {
		const user = await User.findOne({ role: roles.ADMIN });
		if (!user) {
			await User.create({
				username: process.env.ADMIN_USERNAME,
				email: process.env.ADMIN_EMAIL,
				password: process.env.ADMIN_PASSWORD,
				role: [roles.ADMIN],
			});
		}
	} catch (error) {
		console.log(error);
	}

	// Create mock data
	if (process.env.CREATE_MOCK_DATA === 'true') {
		console.log('Creating mock data');
		createMockData();
	} else {
		console.log('Not creating mock data');
	}
};

module.exports = connectDB;
