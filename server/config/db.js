const mongoose = require('mongoose');
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
			console.log(`MongoDB error ${url}`);
		})
		.finally(() => {
			console.log(`MongoDB Connected to ${url}`);
		});
};

module.exports = connectDB;
