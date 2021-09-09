const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var MongoseSchema = mongoose.Schema;
var grocerieObject = new mongoose.Schema({
	name: String,
	amount: Number,
});
const GroceriesSchema = new MongoseSchema({
	owner: {
		type: String,
		required: [true, 'Please provide the owner of the grocerielist'],
		unique: true,
	},
	name: {
		type: String,
	},
	groceries: [grocerieObject],
});

GroceriesSchema.plugin(mongoosePaginate);
const Groceries = mongoose.model('Groceries', GroceriesSchema);
module.exports = Groceries;
