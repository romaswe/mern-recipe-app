const jwt = require('jsonwebtoken');
const Groceries = require('../models/Groceries');
const Recipe = require('../models/Recipes');
const User = require('../models/Users');
const GroupRecipes = require('../models/GroupRecipes');
const ErrorResponse = require('../utils/errorResponse');

exports.getPrivateRoute = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: 'You got access to the private data in this route',
	});
};

exports.getRecipes = async (req, res, next) => {
	const page = req.query.page ?? 1;
	const limit = req.query.limit ?? 10;
	try {
		const options = {
			page: page,
			limit: limit,
			collation: {
				locale: 'sv',
			},
			sort: { name: 1 },
		};
		const recipes = await Recipe.paginate({}, options);
		res.status(200).json({
			success: true,
			data: recipes,
		});
	} catch (error) {
		return next(error);
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
		if (!user) {
			return next(new ErrorResponse('Not a valid user', 401));
		}

		const options = {
			select: 'groceries name -_id',
			limit: 5,
			collation: {
				locale: 'sv',
			},
			sort: { name: 1 },
		};
		const mQuery = Groceries.findOne({ owner: decoded.id });
		const grocerieList = await Groceries.paginate(mQuery, options);
		res.status(200).json({
			success: true,
			data: grocerieList.docs[0],
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
		const filter = { owner: owner, name: name };
		const update = { $push: { groceries: groceries } }; // Use push to add, or use addToSet to only add unique
		const findGroceriList = await Groceries.findOne(filter);
		if (findGroceriList) {
			if (findGroceriList.groceries.length >= 75) {
				return next(
					new ErrorResponse(
						'You have reach max number of groceries',
						303
					)
				);
			} else {
				const grocerie = await Groceries.findOneAndUpdate(
					filter,
					update
				);
			}
		} else {
			const grocerie = await Groceries.create({
				owner,
				name,
				groceries,
			});
		}

		res.status(200).json({
			success: true,
			data: `You added groceries`,
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteGroceries = async (req, res, next) => {
	// This needs work, if you send in "1" and have 2 "1" in the array, both are removed
	const { name, groceries } = req.body;
	let token;
	const numberOfItems = groceries.length;

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

		const filter = { owner: owner, name: name };
		const update = { $pull: { groceries: { $in: groceries } } };

		const grocerie = await Groceries.updateOne(filter, update);

		res.status(200).json({
			success: true,
			data: `You deleted ${numberOfItems} groceries`,
		});
	} catch (error) {
		next(error);
	}
};

exports.setGroceries = async (req, res, next) => {
	const { name, groceries } = req.body;
	let token;
	const numberOfItems = groceries.length;

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

		const filter = { owner: owner, name: name };
		const update = { groceries: groceries };

		const grocerie = await Groceries.findOneAndUpdate(filter, update);

		res.status(200).json({
			success: true,
			data: `You changed to: ${numberOfItems} groceries`,
		});
	} catch (error) {
		next(error);
	}
};

exports.getGroceriesInfo = async (req, res, next) => {
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
			return next(new ErrorResponse('Not a valid user', 401));
		}

		const grocerieInfo = await Groceries.findOne({
			owner: decoded.id,
		}).select('name groceries -_id');

		if (grocerieInfo) {
			const returnInfo = {
				name: grocerieInfo.name,
				size: grocerieInfo.groceries.length,
			};
			res.status(200).json({
				success: true,
				data: returnInfo,
			});
		} else {
			const returnInfo = {
				name: '',
				size: 0,
			};
			res.status(200).json({
				success: true,
				data: returnInfo,
			});
		}
	} catch (error) {
		return next(error);
	}
};

exports.getGroupRecipes = async (req, res, next) => {
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
		let groupName = req.params.groupName;
		if (!groupName) {
			return next(
				new ErrorResponse('Please provide the group name', 401) // Use better response code
			);
		}
		const groupRecipeResponse = await GroupRecipes.findOne({
			groupName: groupName,
		}).populate('recipes');
		console.log(groupRecipeResponse);
		res.status(200).json({
			success: true,
			data: groupRecipeResponse,
		});
	} catch (error) {
		return next(error);
	}
};
