const Recipe = require('../models/Recipes');

exports.getPublicRoute = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: 'You called the public route',
	});
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
