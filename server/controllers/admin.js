const Recipe = require('../models/Recipes');
const User = require('../models/Users');
const GroupRecipes = require('../models/GroupRecipes');
const ErrorResponse = require('../utils/errorResponse');

exports.getAdminRoute = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: 'You got access to the admin data in this route',
	});
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
		const cleanName = name.replace(/_/g, ' ').trim();
		console.log(cleanName);
		const recipe = await Recipe.create({
			name: cleanName,
			url,
			notes,
			description,
			categories,
			ingrediens,
			instructions,
		});
		res.status(200).json({
			success: true,
			data: `You added recipe ${cleanName}`,
		});
	} catch (error) {
		next(error);
	}
};

exports.getUsers = async (req, res, next) => {
	const page = req.query.page ?? 1;
	const limit = req.query.limit ?? 10;
	try {
		const options = {
			page: page,
			limit: limit,
			collation: {
				locale: 'sv',
			},
			sort: { email: 1 },
		};
		const users = await User.paginate({}, options);
		res.status(200).json({
			success: true,
			data: users,
		});
	} catch (error) {
		return next(error);
	}
};

exports.setUserRole = async (req, res, next) => {
	const { userID, role } = req.body;
	try {
		const update = { $set: { role: role } };
		const user = await User.findByIdAndUpdate(userID, update);
		res.status(200).json({
			success: true,
			data: `Role changed to ${role}`,
		});
	} catch (error) {
		return next(error);
	}
};

exports.addGroupRecipes = async (req, res, next) => {
	const { groupName, description, recipes, notes } = req.body;
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
		const cleanName = groupName.replace(/_/g, ' ').trim();
		const groupRecipe = await GroupRecipes.create({
			groupName: cleanName,
			description,
			recipes,
			notes,
		});
		res.status(200).json({
			success: true,
			data: `You added groupRecipe ${cleanName}`,
		});
	} catch (error) {
		return next(error);
	}
};
exports.deleteRecipes = async (req, res, next) => {
	let id = req.params.id;
	if (!id) {
		return next(new ErrorResponse('No id found', 400));
	}

	try {
		const numberOfDeletedEntriess = await Recipe.deleteOne({ _id: id });
		res.status(200).json({
			success: true,
			data: `Number of deleted provided: ${numberOfDeletedEntriess}`,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteGroupRecipes = async (req, res, next) => {
	let id = req.params.id;
	if (!id) {
		return next(new ErrorResponse('No id provided', 400));
	}

	try {
		const numberOfDeletedEntriess = await GroupRecipes.deleteOne({
			_id: id,
		});
		res.status(200).json({
			success: true,
			data: `Number of deleted entries: ${numberOfDeletedEntriess}`,
		});
	} catch (error) {
		next(error);
	}
};
