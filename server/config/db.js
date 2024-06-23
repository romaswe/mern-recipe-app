const mongoose = require('mongoose');
const { User, insertUsers } = require('../models/Users');
const Recipes = require('../models/Recipes');
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
		const user = await User.findOne({ role: 'admin' });
		if (!user) {
			await User.create({
				username: process.env.ADMIN_USERNAME,
				email: process.env.ADMIN_EMAIL,
				password: process.env.ADMIN_PASSWORD,
				role: ['admin'],
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

// TODO: The create mock data function should be moved to a separate file
const createMockData = async () => {
	const testRecipes = [
		{
			name: 'Lorem Ipsum Cake',
			url: 'http://example.com/lorem-ipsum-cake',
			notes: 'This is a test note for Lorem Ipsum Cake.',
			description: 'A delicious cake made from lorem ipsum ingredients.',
			categories: ['Dessert', 'Cake'],
			ingredients: [
				{ name: 'Flour', quantity: '2 cups' },
				{ name: 'Sugar', quantity: '1 cup' },
				{ name: 'Butter', quantity: '1/2 cup' },
				{ name: 'Eggs', quantity: '3' },
			],
			instructions: [
				'Preheat the oven to 350°F (175°C).',
				'In a bowl, mix flour and sugar.',
				'Add butter and eggs, then mix until smooth.',
				'Pour the mixture into a baking dish and bake for 30 minutes.',
			],
			tags: ['easy', 'quick', 'sweet'],
		},
		{
			name: 'Dolor Sit Amet Salad',
			url: 'http://example.com/dolor-sit-amet-salad',
			notes: 'This is a test note for Dolor Sit Amet Salad.',
			description: 'A refreshing salad with dolor sit amet ingredients.',
			categories: ['Salad', 'Healthy'],
			ingredients: [
				{ name: 'Lettuce', quantity: '1 head' },
				{ name: 'Tomatoes', quantity: '2' },
				{ name: 'Cucumber', quantity: '1' },
				{ name: 'Olive Oil', quantity: '2 tbsp' },
			],
			instructions: [
				'Wash and chop the lettuce, tomatoes, and cucumber.',
				'In a bowl, combine the chopped vegetables.',
				'Drizzle with olive oil and toss to combine.',
				'Serve immediately.',
			],
			tags: ['healthy', 'vegetarian', 'quick'],
		},
		{
			name: 'Consectetur Adipiscing Bread',
			url: 'http://example.com/consectetur-adipiscing-bread',
			notes: 'This is a test note for Consectetur Adipiscing Bread.',
			description:
				'A hearty bread made with consectetur adipiscing ingredients.',
			categories: ['Bread', 'Baking'],
			ingredients: [
				{ name: 'Yeast', quantity: '1 packet' },
				{ name: 'Warm Water', quantity: '1 cup' },
				{ name: 'Salt', quantity: '1 tsp' },
				{ name: 'Whole Wheat Flour', quantity: '3 cups' },
			],
			instructions: [
				'In a bowl, dissolve yeast in warm water.',
				'Add salt and flour, then knead the dough until smooth.',
				'Let the dough rise for 1 hour.',
				'Bake at 375°F (190°C) for 30 minutes.',
			],
			tags: ['baking', 'whole wheat', 'healthy'],
		},
	];

	const testUsers = [
		{
			username: 'johnDoe',
			email: 'john.doe@example.com',
			password: 'password123',
			role: [roles.VIEWER],
			resetPasswordToken: null,
			resetPasswordExpire: null,
		},
		{
			username: 'janeSmith',
			email: 'jane.smith@example.com',
			password: 'securePass1',
			role: [roles.USER],
			resetPasswordToken: null,
			resetPasswordExpire: null,
		},
		{
			username: 'adminUser',
			email: 'admin.user@example.com',
			password: 'adminPass1!',
			role: [roles.ADMIN],
			resetPasswordToken: null,
			resetPasswordExpire: null,
		},
		{
			username: 'aliceBrown',
			email: 'alice.brown@example.com',
			password: 'alicePass12',
			role: [roles.VIEWER, roles.USER],
			resetPasswordToken: null,
			resetPasswordExpire: null,
		},
		{
			username: 'bobGreen',
			email: 'bob.green@example.com',
			password: 'bobPassword34',
			role: [roles.USER, roles.ADMIN],
			resetPasswordToken: 'abcd1234', // Example token, you would generate this dynamically
			resetPasswordExpire: new Date(Date.now() + 3600000), // 1 hour from now
		},
	];

	try {
		// Only create recipes if they don't exist
		const recipes = await Recipes.find();
		if (recipes.length > 0) {
			console.log('Recipes already exist');
		} else {
			console.log('Creating recipes...');
			await Recipes.insertMany(testRecipes);
		}

		// Only create users if they don't exist (except admin)
		const users = await User.find();
		if (users.length > 1) {
			console.log('Users already exist');
		} else {
			console.log('Creating users...');
			await insertUsers(testUsers);
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = connectDB;
