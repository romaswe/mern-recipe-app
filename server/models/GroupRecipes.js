const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var MongoseSchema = mongoose.Schema;
var groupRecipeSchema = new MongoseSchema({
	description: {
		type: String,
	},
	groupName: {
		type: String,
		required: [true, 'Please provide the name of the group of recipes'],
		unique: true,
	},
	recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
});
groupRecipeSchema.plugin(mongoosePaginate);
const GroupRecipes = mongoose.model('GroupRecipes', groupRecipeSchema);
module.exports = GroupRecipes;
