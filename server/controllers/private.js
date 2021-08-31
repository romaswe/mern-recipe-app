const jwt = require('jsonwebtoken');
const Groceries = require('../models/Groceries');
const Recipe = require('../models/Recipes');
const User = require('../models/Users');
const ErrorResponse = require('../utils/errorResponse');

exports.getPrivateRoute = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: 'You got access to the private data in this route',
	});
};

exports.getRecipes = async (req, res, next) => {
	try {
		const recipes = await Recipe.find({});
		res.status(200).json({
			success: true,
			data: recipes,
		});
	} catch (error) {
		return next(error);
	}
};

exports.getRecipeByName = async (req, res, next) => {
	const recipeName = req.params.recipeName;
	try {
		const recipes = await Recipe.findOne({ name: recipeName });
		res.status(200).json({
			success: true,
			data: recipes,
		});
	} catch (error) {
		return next(error);
	}
};

exports.addRecipe = async (req, res, next) => {
	const {
		name,
		url,
		notes,
		description,
		categories,
		ingrediens,
		instructions,
	} = req.body;
	try {
		const recipe = await Recipe.create({
			name,
			url,
			notes,
			description,
			categories,
			ingrediens,
			instructions,
		});
		res.status(200).json({
			success: true,
			data: `You added recipe ${name}`,
		});
	} catch (error) {
		next(error);
	}
};

exports.getGrocerieList = async (req, res, next) => {
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
		console.log(decoded.id);
		if (!user) {
			return next(new ErrorResponse('Not a valid user', 401));
		}
		const grocerieList = await Groceries.findOne({
			owner: decoded.id,
		}).select('groceries -_id');
		res.status(200).json({
			success: true,
			data: grocerieList,
		});
	} catch (error) {
		return next(error);
	}
};

exports.addGroceries = async (req, res, next) => {
	const { name, groceries } = req.body;
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

		const owner = decoded.id;
		const user = await User.findById(owner);
		if (!user) {
			return next(new ErrorResponse('Not a valid user', 401));
		}

		const grocerie = await Groceries.findOneAndUpdate({
			owner,
			name,
			groceries,
		});
		if (!grocerie) {
			const grocerie = await Groceries.create({
				owner,
				name,
				groceries,
			});
		}
		res.status(200).json({
			success: true,
			data: `You added ${grocerie.groceries.length} groceries`,
		});
	} catch (error) {
		next(error);
	}
};
