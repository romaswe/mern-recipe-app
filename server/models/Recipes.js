const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var listIngrediens = new mongoose.Schema({
	name: String,
	amount: String,
	unit: String,
});

const RecipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide a recipe name'],
		unique: true,
	},
	url: {
		type: String,
	},
	notes: {
		type: String,
	},
	description: {
		type: String,
	},
	categories: [{ type: String }],
	ingrediens: [listIngrediens],

	instructions: [{ type: String }],
});

RecipeSchema.plugin(mongoosePaginate);
const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;
