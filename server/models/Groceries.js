const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var MongoseSchema = mongoose.Schema;
const GroceriesSchema = new MongoseSchema({
	owner: {
		type: String,
		required: [true, 'Please provide the owner of the grocerielist'],
		unique: true,
	},
	name: {
		type: String,
	},
	groceries: [{ type: String }],
});

GroceriesSchema.plugin(mongoosePaginate);
const Groceries = mongoose.model('Groceries', GroceriesSchema);
module.exports = Groceries;
