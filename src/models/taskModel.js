const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		check: {
			type: Boolean,
		},
	},
	{
		timestamps: true,
	}
);

const Task = mongoose.model('Task', taskSchema);

module.exports = {
	Task,
};
