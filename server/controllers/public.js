const Recipe = require('../models/Recipes');

exports.getPublicRoute = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: 'You called the public route',
	});
};

exports.getRecipeByName = async (req, res, next) => {
	const recipeName = req.params.recipeName;
	const cleanName = recipeName.replace(/_/g, ' ').trim();
	try {
		const recipes = await Recipe.findOne({ name: cleanName });
		res.status(200).json({
			success: true,
			data: recipes,
		});
	} catch (error) {
		return next(error);
	}
};
