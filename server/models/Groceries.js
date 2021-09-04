const mongoose = require('mongoose');

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

const Groceries = mongoose.model('Groceries', GroceriesSchema);
module.exports = Groceries;
