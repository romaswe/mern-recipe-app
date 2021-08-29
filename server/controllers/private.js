const Recipe = require('../models/Recipes');

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

exports.addRecipe = async (req, res, next) => {
	const { name, url, notes, ingrediens, instructions } = req.body;
	try {
		const recipe = await Recipe.create({
			name,
			url,
			notes,
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
