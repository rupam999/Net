const mongoose = require('mongoose');

const userAmoutSchema = mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
		},
		agent: {
			type: String,
			required: true,
		},
		amount: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Amount = mongoose.model('Amount', userAmoutSchema);

module.exports = {
	Amount,
};
